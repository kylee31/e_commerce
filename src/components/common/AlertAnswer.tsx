import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const AlertAnswer = ({
  children,
  answer,
  text,
  trueButton,
  falseButton,
  onTrueClick,
  onFalseClick,
  className,
}: {
  children: React.ReactNode;
  answer: string;
  text?: string;
  trueButton: string;
  falseButton: string;
  onTrueClick: () => void;
  onFalseClick?: () => void;
  className?: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={className}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{answer}</AlertDialogTitle>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onTrueClick}>
            {trueButton}
          </AlertDialogAction>
          <AlertDialogCancel onClick={onFalseClick}>
            {falseButton}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertAnswer;
