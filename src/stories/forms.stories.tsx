import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { QuantityStepper } from "@/components/cart/quantity-stepper"
import { FormAlert, FormSuccess, SelectField, SubmitButton, TextAreaField, TextField } from "@/components/forms/fields"
import { contactTopics } from "@/lib/forms"

const meta = { title: "Forms/Fields", parameters: { layout: "padded" } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function FieldsDemo({ withErrors }: { withErrors: boolean }) {
  const { register } = useForm()
  const error = (message: string) => (withErrors ? { type: "manual", message } : undefined)
  return (
    <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
      <TextField label="Name" registration={register("name")} error={error("Please enter your name.")} />
      <TextField label="Email" type="email" registration={register("email")} error={error("Please enter a valid email address.")} />
      <SelectField label="What is your message about?" options={contactTopics} registration={register("topic")} className="sm:col-span-2" error={error("Please choose what your message is about.")} />
      <TextField label="Estimated quantity / scale" optional registration={register("scale")} />
      <TextField label="Subject" hint="A few words is fine." registration={register("subject")} />
      <TextAreaField label="Message" registration={register("message")} className="sm:col-span-2" error={error("Please tell us a little more.")} />
      <SubmitButton pending={false}>Send message</SubmitButton>
    </div>
  )
}

export const Default: Story = { render: () => <FieldsDemo withErrors={false} /> }
export const WithErrors: Story = { render: () => <FieldsDemo withErrors /> }
export const Pending: Story = { render: () => <SubmitButton pending>Send message</SubmitButton> }
export const Alert: Story = { render: () => <FormAlert message="Sorry — we couldn’t send that just now. Please try again." /> }
export const Success: Story = { render: () => <FormSuccess message="Thanks — your message has been sent." onReset={() => {}} /> }

export const Quantity: Story = {
  render: function Render() {
    const [value, setValue] = useState(1)
    return (
      <div className="flex flex-col items-start gap-4">
        <QuantityStepper value={value} onChange={setValue} label="Quantity" />
        <QuantityStepper value={value} onChange={setValue} label="Quantity (small)" size="sm" />
      </div>
    )
  },
}
