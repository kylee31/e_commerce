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
  onTrueClick,
  onFalseClick,
}: {
  children: React.ReactNode;
  answer: string;
  onTrueClick: () => void;
  onFalseClick?: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{answer}</AlertDialogTitle>
          <AlertDialogDescription>
            삭제 시 복구가 불가능합니다!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onTrueClick}>삭제</AlertDialogAction>
          <AlertDialogCancel onClick={onFalseClick}>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertAnswer;
