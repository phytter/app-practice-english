import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader } from "../ui/card"

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <Skeleton className="h-4 w-[100px]" />
      </CardHeader>
    </Card>
  )
}
