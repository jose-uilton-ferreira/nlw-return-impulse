import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from '../../../lib/api';
import { Loading } from "../../Loading";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestartRequested,
    onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleFeedbackSubmit(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true);

    // await api.post('/feedbacks', {
    //   type: feedbackType,
    //   comment,
    //   screenshot
    // });

    setIsSendingFeedback(false);

    onFeedbackSent();
  }

  return (
    <>
      <header className="text-xl leading-6">
        <div
          onClick={onFeedbackRestartRequested}
          className="absolute top-5 left-5 text-zinc-500 hover:text-zinc-800 
                     dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer"
        >
          <ArrowLeft weight="bold" className="w-6 h-6" />
        </div>
        
        <span className="flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <img className="w-6 h-6" src={feedbackTypeInfo.img.src} alt={feedbackTypeInfo.img.alt} />

          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form
        onSubmit={handleFeedbackSubmit}
        className="my-4 w-full"
      >
        <textarea
          className="min-w-[304px] min-h-[112px] w-full text-sm bg-transparent 
                   placeholder-zinc-500 text-zinc-800 border-zinc-300 dark:placeholder-zinc-400 
                   dark:text-zinc-100 dark:border-zinc-600 rounded-md focus:border-brand-500 
                   focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 
                   scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
          value={comment}
        />

        <footer className="flex mt-2 gap-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
            disabled={comment.length === 0}
          />

          <button
            type="submit"
            className="flex justify-center items-center text-sm bg-brand-500 text-white 
                       rounded-md flex-1 p-2 hover:bg-brand-300 transition-colors focus:outline-none
                       focus:ring-2 focus:ring-offset-2 focus:ring-offset-white 
                       dark:focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 
                       disabled:hover:bg-brand-500"
            disabled={comment.length === 0 || isSendingFeedback}
          >
            { isSendingFeedback ? <Loading /> : 'Enviar feedback' } 
          </button>
        </footer>
      </form>
    </>
  );
}