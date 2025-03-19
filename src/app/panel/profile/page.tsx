"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialoguePracticeHistoryModel } from "@/domain/models";
import { makeDialogueServiceFactory } from "@/main/factories/services";
import { useQuery } from "@tanstack/react-query";
import { Award, Calendar, Clock, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;
  const dialogueService = useMemo(() => makeDialogueServiceFactory(), []);

  const { data: practiceHistory } = useQuery<DialoguePracticeHistoryModel[]>({
    queryKey: ["practiceHistory"],
    queryFn: async () => {
      return dialogueService.listPracticeHistory();
    }
  });

  if (!user) return null;

  const nextLevelXp = user.progress.level * 1000;
  const xpProgress = (user.progress.xp_points / nextLevelXp) * 100;

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Level {user.progress.level}</CardTitle>
              <CardDescription>
                {user.progress.xp_points} / {nextLevelXp} XP to next level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={xpProgress} className="mb-2" />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {user.progress.total_dialogues} practices
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {user.progress.average_pronunciation_score?.toFixed(1)} avg. score
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your earned badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {user.achievements?.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                  >
                    <Award className="w-4 h-4 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {achievement.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Practice History</CardTitle>
            <CardDescription>Your recent practice sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="best">Best Scores</TabsTrigger>
              </TabsList>

              <TabsContent value="recent">
                <div className="space-y-4">
                  {practiceHistory?.map((practice) => (
                    <div
                      key={practice._id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted"
                    >
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
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="best">

              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
