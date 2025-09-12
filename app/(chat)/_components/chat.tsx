import MessageCard from "@/components/cards/message.card"
import ChatLoading from "@/components/loadings/chat.loading"
import MessageLoading from "@/components/loadings/message.loading"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { messageSchema } from "@/lib/validation"
import { Paperclip, Send, Smile } from "lucide-react"
import { FC, useRef } from "react"
import { UseFormReturn } from "react-hook-form"
import z from "zod"
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTheme } from "next-themes"

interface Props {
  onSendMessage: (values: z.infer<typeof messageSchema>) => void
  messageForm: UseFormReturn<z.infer<typeof messageSchema>>
}

const Chat: FC<Props> = ({ onSendMessage, messageForm }) => {
  const { resolvedTheme } = useTheme()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleEmojiSelect = (emoji: string) => {
    const input = inputRef.current;
    if (!input) return;

    const text = messageForm.getValues('text')
    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? 0

    const newText = text.slice(0, start) + emoji + text.slice(end)
    messageForm.setValue('text', newText)

    setTimeout(() => {
      input.setSelectionRange(start + emoji.length, start + emoji.length)
    }, 0)
  }
  return (
    <div className="flex flex-col justify-end z-40 min-h-[92vh]">
      {/* Loading... */}
      {/* <ChatLoading /> */}

      {/* Message */}
      {/* <MessageCard isReceived /> */}

      {/* Start Conversation */}
      {/* <div className="w-full h-[88vh] flex items-center justify-center ">
        <div className="text-8xl cursor-pointer" onClick={() => onSendMessage({text: '👋🏻'})}>👋🏻</div>
      </div> */}

      {/* Message input */}
      <Form {...messageForm}>
        <form onSubmit={messageForm.handleSubmit(onSendMessage)} className="w-full flex relative">
          <Button size={'icon'} type="button" value={"secondary"}>
            <Paperclip />
          </Button>
          <FormField
            control={messageForm.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="bg-secondary border-1 border-1-muted-foreground border-r border-r-muted-foreground
                   h-9"
                    placeholder="Type a message"
                    value={field.value}
                    onBlur={() => field.onBlur()}
                    onChange={e => field.onChange(e.target.value)}
                    ref={inputRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button size={'icon'} type="button" value="secondary">
                <Smile />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none rounded-md absolute bottom-0 right-6">
              <EmojiPicker
                theme={resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT}
                onEmojiClick={(emojiData) => handleEmojiSelect(emojiData.emoji)}
              />
            </PopoverContent>
          </Popover>

          <Button size={'icon'} type="submit">
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Chat
