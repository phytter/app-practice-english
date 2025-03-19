import { NavbarHome } from "@/components/layout/navbar-home";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Film, Mic2, Trophy } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>    
      <NavbarHome />
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Practice English with Movie Dialogues
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Improve your pronunciation and fluency by practicing real conversations
            from your favorite movies and TV shows
          </p>
          <Button asChild size="lg">
            <Link href="/panel/practice">
              Start Practicing
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Film className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Movie Dialogues</CardTitle>
            </CardHeader>
            <CardContent>
              Choose from a vast collection of movie and TV show dialogues,
              categorized by difficulty level and genre
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Mic2 className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>AI Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              Get instant feedback on your pronunciation and fluency from our
              advanced AI system
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              Monitor your improvement with detailed statistics and earn
              achievements as you practice
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to improve your English?</h2>
          <Button asChild variant="secondary">
            <Link href="/auth/signin">Sign Up Now</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
