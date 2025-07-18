import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqItems = [
  {
    question: "How can we help you?",
    answer: "Our team is here to assist you with any questions or concerns you may have.",
  },
  {
    question: "What services do you offer?",
    answer: "We provide a wide range of services tailored to meet your specific needs.",
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team 24/7 through email, phone, or live chat.",
  },
]

export default function Questions() {
  return (
    <div id="faq" className="flex items-center justify-center p-6 min-h-fit bg-slate-200">
      <Card className="w-full mx-auto transition-shadow duration-300 shadow-lg hover:shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="hidden font-bold text-blue-600 sm:text-4xl">FAQs</CardTitle>
          <p className="hidden text-xl sm:text-blue-600">we are here to answer all your questions</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div>
              <div className="w-64 h-64 mb-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(20)-J3J7ww6SIVq0u8ypPCWGphITafZaOm.png"
                  alt="FAQ Illustration"
                  className="block object-contain w-full h-full"
                />
              </div>
            </div>
            <div>
              <div className="grid w-full max-w-2xl gap-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="p-4 transition-colors duration-300 rounded-lg bg-blue-50 hover:bg-blue-100">
                    <h3 className="mb-2 font-semibold text-blue-600">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

