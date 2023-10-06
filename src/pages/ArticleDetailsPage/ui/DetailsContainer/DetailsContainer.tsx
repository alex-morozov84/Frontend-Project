import {memo} from 'react'
import {useParams} from "react-router-dom";
import {ArticleDetails} from "@/entities/Article";
import {Card} from "@/shared/ui/redesigned/Card";

interface DetailsContainerProps {
  className?: string
}

export const DetailsContainer = memo(({className}: DetailsContainerProps) => {
  const {id} = useParams<{ id: string }>()

  return (
    <Card max fullHeight className={className} padding='24'
          border='round'>
      <ArticleDetails id={id}/>
    </Card>
  );
});