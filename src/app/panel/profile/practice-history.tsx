import { Button } from "@/components/ui/button";
import { DialoguePracticeHistoryModel } from "@/domain/models";
import { makeDialogueServiceFactory } from "@/main/factories/services";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { useMemo } from "react";

export function PracticeHistory ({ filterType }: { filterType: 'best' | 'recent' }) {
    const dialogueService = useMemo(() => makeDialogueServiceFactory(), []);
  const { data: practiceHistory } = useQuery<DialoguePracticeHistoryModel[]>({
    queryKey: ["practiceHistory", filterType],
    queryFn: async () => {
      return dialogueService.listPracticeHistory(filterType);
    }
  });

  return (
    <div className="space-y-4">
      {
        practiceHistory?.map?.(practice => (
          <div key={practice._id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <p className="font-medium">{practice.dialogue?.movie?.title}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Fluency score: {Math.round(practice.fluency_score * 100)}</span>
                <span>Pronunciation score: {Math.round(practice.pronunciation_score * 100)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(practice.completed_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Practice Again
            </Button>
          </div>
        ))
      }
    </div>
  )
}