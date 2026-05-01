type Props = {
  attribution: string;
};

export function CopyrightFooter({ attribution }: Props) {
  return (
    <p className="text-xs text-muted-foreground/80 leading-relaxed pt-4 mt-2 border-t">
      {attribution}
    </p>
  );
}
