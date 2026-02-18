export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-brand-green border-l-2 border-brand-green px-4 bg-brand-green/5 py-2 rounded-r">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-destructive border-l-2 border-destructive px-4 bg-destructive/5 py-2 rounded-r">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 border-primary px-4 bg-primary/5 py-2 rounded-r">
          {message.message}
        </div>
      )}
    </div>
  );
}
