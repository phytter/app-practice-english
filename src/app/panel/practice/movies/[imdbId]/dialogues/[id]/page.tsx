"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogueModel, DialoguePracticeResultModel } from "@/domain/models";
import { makeDialogueServiceFactory } from "@/main/factories/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, Play, Square } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import WaveSurfer from "wavesurfer.js";
import { FeedbackDialog } from "./feedback-dialog";

export default function PracticeDialoguePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [practiceResult, setPracticeResult] = useState<DialoguePracticeResultModel>();
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer>(null);
  const mediaRecorder = useRef<MediaRecorder>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { id } = useParams<{ id: string }>();
  const dialogueService = useMemo(() => makeDialogueServiceFactory(), []);

const { data: dialogue } = useQuery<DialogueModel>({
    queryKey: ["dialogue", id],
    queryFn: async () => {
      return dialogueService.show(id);
    },
  });

  const submitPracticeMutation = useMutation({
    mutationFn: async (audioBlob: Blob) => {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      return dialogueService.practice(id, formData);
    },
    onSuccess: (data) => {
      setPracticeResult(data);
      setShowFeedback(true);
    },
  });

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "violet",
        progressColor: "purple",
        cursorColor: "navy",
        height: 50,
      });

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, []);

  const startRecording = async () => {
    try { 
      audioChunksRef.current = []
      if (!mediaRecorder.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream,{
          mimeType: 'audio/webm'
        });
        mediaRecorder.current = recorder;
      }

      mediaRecorder.current.ondataavailable = (e) => {
        audioChunksRef.current = [...audioChunksRef.current, e.data];
      };

      mediaRecorder.current.onstop = async () => {        
        sendAudioToApi();
      };

      setIsRecording(true);
      mediaRecorder.current.start();
    } catch {
      toast.error('Error accessing microphone');
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    setCanPlayAudio(true);
  };

  const sendAudioToApi = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    await submitPracticeMutation.mutateAsync(audioBlob);
  } 

  const playAudio = () => {
    if (!audioChunksRef.current) return;
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const audio = new Audio(URL.createObjectURL(audioBlob));
    audio.play();
  };

  const closeFeedBack = () => { 
    setShowFeedback(false);
  }


  if (!dialogue) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{dialogue.movie.title}</h1>
            <p className="text-muted-foreground">
              Level {dialogue.difficulty_level}
            </p>
          </div>
        </motion.div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              <div className="space-y-4">
                {dialogue.lines.map((line, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg transition-colors"
                  >
                    {line.character && (
                      <div className="font-medium min-w-[100px]">
                        {line.character}
                      </div>
                    )}
                    <div>{` - ${line.text}`}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 pt-4 shadow-lg space-y-4"
        >
          <div className="flex gap-4 justify-end pr-35">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                isLoading={submitPracticeMutation.isPending}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <>
                    <Square className="mr-2" /> Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2" /> Start Recording
                  </>
                )}
              </Button>
            </motion.div>
            <Button size="lg" onClick={playAudio} disabled={!canPlayAudio}>
              <Play className="mr-2" /> Play Audio
            </Button>
          </div>
          <div ref={waveformRef} />
        </motion.div>
      </div>

      {practiceResult && (
        <FeedbackDialog
          isOpen={showFeedback}
          onClose={closeFeedBack}
          result={practiceResult}
        />
      )}
    </div>
  );
}
