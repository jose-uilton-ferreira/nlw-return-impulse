import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bugImg from '../../assets/bug.svg';
import ideaImg from '../../assets/idea.svg';
import thoughtImg from '../../assets/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';
import { ThemeToggle } from "../ThemeToggle";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    img: {
      src: bugImg,
      alt: 'Imagem de um inseto',
    }
  },
  IDEA: {
    title: 'Ideia',
    img: {
      src: ideaImg,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    img: {
      src: thoughtImg,
      alt: 'Imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div
      className="relative bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 p-4 
                 mb-4 rounded-2xl flex flex-col items-center shadow-lg w-[calc(100vw-2rem)]
                 md:w-auto"
    >
      { feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
      ) : (
        <>
          { !feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          ) }
        </>
      ) }

      <footer className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
        Feito com ♥ pela <a href="http://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a>
      </footer>

      <ThemeToggle />
    </div>
  )
}