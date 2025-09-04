'use client'
import { Loader2 } from "lucide-react"
import ContactList from "./_components/contact-list"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AddContact from "./_components/add-contact"
import { useCurrentContact } from "@/hooks/use-current"
import { useForm } from "react-hook-form"
import z from "zod"
import { emailSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import TopChat from "./_components/top-chat"
import Chat from "./_components/chat"

const HomePage = () => {
  const { currentContact } = useCurrentContact()
  const router = useRouter();

  const contactForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  })

  const messageForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  })

  useEffect(() => {
    router.replace('/')
  }, [])

  const onCreateContact = (values: z.infer<typeof emailSchema>) => {
    // API call to create contact
    console.log(values)
  }
  return (
    <>
      {/* sidebar */}
      <div className="w-80 h-screen border-r fixed inset-0 z-50 ">
        {/* loading... */}
        {/* <div className="w-full h-[95vh] flex justify-center items-center">
          <Loader2 size={50} className="animate-spin" />
        </div> */}
        {/* contact-list */}
        <ContactList contacts={contacts} />
      </div>
      {/* chat area */}
      <div className="pl-80 w-full ">
        {/* add contact */}
        {!currentContact?._id && <AddContact contactForm={contactForm} onCreateContact={onCreateContact} />}
        {/* chat  */}
        {currentContact?._id && <div className="w-full relative">
          {/* top chat */}
            <TopChat />
          {/* chat messages */}
            <Chat />
        </div>}
      </div>
    </>
  )
}

const contacts = [
  { email: 'john@gmail.com', _id: '1', avatar: "https://github.com/shadcn.png" },
  { email: 'amila@gmail.com', _id: '2' },
  { email: 'hala@gmail.com', _id: '3' },
  { email: 'nora@gmail.com', _id: '4' },
  { email: 'uraa@gmail.com', _id: '5' },
]

export default HomePage