"use client";

import { LoadCardListWrapper } from "@/components/layout/load-card-list-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogueModel } from "@/domain/models";
import { useDebounce } from "@/hooks/use-debounce";
import { makeDialogueServiceFactory } from "@/main/factories/services";
import { useQuery } from "@tanstack/react-query";
import { Film, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function PracticePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const router = useRouter()
  const { imdbId } = useParams<{ imdbId: string }>();
  const dialogueService = useMemo(() => makeDialogueServiceFactory(), []);

  const { data: dialogues, isLoading } = useQuery<DialogueModel[]>({
    queryKey: ['dialogues', debouncedSearch, selectedDifficulty, imdbId],
    queryFn: async () => {
      return dialogueService.search({
        imdb_id: imdbId,
        difficulty: selectedDifficulty !== 'all' ? selectedDifficulty : '',
        search: debouncedSearch
      });
    },
  });

  return (
    <div className="container mx-auto p-8 pt-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dialogues</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search dialogues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md pl-10"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={e => setSelectedDifficulty(e)}>
        <h3 className="text-sm font-medium mb-1">Difficulty</h3>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="1">Easy</TabsTrigger>
          <TabsTrigger value="2">Medium</TabsTrigger>
          <TabsTrigger value="3">Hard</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LoadCardListWrapper loading={isLoading}>
          {dialogues?.map((dialogue) => (
            <Dialog key={dialogue._id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Film className="w-5 h-5" />
                      {dialogue.movie.title}
                    </CardTitle>
                    <CardDescription>
                      • {Math.round(dialogue.duration_seconds)}s •{" "}
                      {dialogue.difficulty_level}/5 difficulty
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {dialogue.lines[0].text}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{dialogue.movie.title}</DialogTitle>
                  <DialogDescription>
                    Start practicing
                  </DialogDescription>
                </DialogHeader>
                <div className="scrollbar-thin px-2 grid gap-4 max-h-[80vh] overflow-auto">
                  {dialogue.lines.map((line, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted"
                    >
                      <div className="font-medium min-w-[100px]">
                        {line.character ? `${line.character}:` : ""}
                      </div>
                      <div>{line.text}</div>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button onClick={() => router.push(`/panel/practice/movies/${imdbId}/dialogues/${dialogue._id}`)}>Start Practice</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </LoadCardListWrapper>
      </div>
    </div>
  );
}
