import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { otpSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const Verify = () => {
  const { email } = useAuth()

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email, otp: "", },
  })

  function onSubmit(values: z.infer<typeof otpSchema>) {
    console.log(values)
    window.open('/', '_self')
  }

  return (
    <div className="w-full">
      <p className="text-center text-muted-foreground text-sm">
        We have sent a verification code to your email address. Please check your inbox and enter the code to verify your account.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input placeholder="shadcn" disabled  {...field} className='bg-secondary' />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <Label>One-Time Password</Label>
                <FormControl>
                  <InputOTP maxLength={6} className='w-full' pattern={REGEXP_ONLY_DIGITS} {...field}>
                    <InputOTPGroup className='w-full'>
                      <InputOTPSlot index={0} className='w-full dark:bg-primary-foreground bg-secondary' />
                      <InputOTPSlot index={1} className='w-full dark:bg-primary-foreground bg-secondary' />
                      <InputOTPSlot index={2} className='w-full dark:bg-primary-foreground bg-secondary' />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className='w-full'>
                      <InputOTPSlot index={3} className='w-full dark:bg-primary-foreground bg-secondary' />
                      <InputOTPSlot index={4} className='w-full dark:bg-primary-foreground bg-secondary' />
                      <InputOTPSlot index={5} className='w-full dark:bg-primary-foreground bg-secondary' />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-full' size={'lg'}>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Verify
