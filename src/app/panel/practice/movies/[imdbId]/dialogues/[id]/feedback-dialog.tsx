"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { DialoguePracticeResultModel } from "@/domain/models";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  result: DialoguePracticeResultModel;
}

export function FeedbackDialog({ isOpen, onClose, result }: FeedbackDialogProps) {
  const router = useRouter();

  const showConfetti = () => {
    if (result?.score >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Practice Complete!</DialogTitle>
          <DialogDescription>{"Here's how you did"}</DialogDescription>
        </DialogHeader>
        <AnimatePresence>
          <div className="grid gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onAnimationComplete={showConfetti}
              className="flex flex-col items-center"
            >
              <div className="relative mb-4">
                <Star
                  className={`w-16 h-16 ${
                    result.score >= 80
                      ? "text-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg">
                  {result.score}
                </span>
              </div>
              <p className="text-xl font-semibold mb-2">
                {result.score >= 80
                  ? "Excellent!"
                  : result.score >= 60
                  ? "Good Job!"
                  : "Keep Practicing!"}
              </p>
              <p className="text-sm text-muted-foreground">
                You earned {result.xp_earned} XP
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Pronunciation</span>
                  <span className="text-sm font-medium">
                    {result.pronunciation_score * 100}%
                  </span>
                </div>
                <Progress value={result.pronunciation_score * 100} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Fluency</span>
                  <span className="text-sm font-medium">
                    {result.fluency_score * 100}%
                  </span>
                </div>
                <Progress value={result.fluency_score * 100} />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              {result.suggestions.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-2 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500" />
                  <span>{comment.message}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatePresence>

        <DialogFooter className="flex gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Practice Again
          </Button>
          <Button onClick={() => router.push("/panel/practice")}>
            Choose Another Dialogue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
