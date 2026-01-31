import { useState } from "react";
import "./index.css";
import { CreditCardWithForm, type FormSubmitData } from "./index";

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FormSubmitData) => {
    setIsSubmitting(true);
    console.log("Submitting:", data);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    alert("Card saved successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <CreditCardWithForm
          layout="vertical"
          gap="3rem"
          cardSize="lg"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Save Card"
          showBankName={true}
          showAddress={false}
          initialValues={{
            bankName: "BBVA",
          }}
          // customFields={[
          //   {
          //     id: "email",
          //     label: "Email",
          //     placeholder: "your@email.com",
          //     type: "email",
          //   },
          //   {
          //     id: "phone",
          //     label: "Phone",
          //     placeholder: "+1 234 567 8900",
          //     type: "tel",
          //   },
          // ]}
          // customFieldsPosition="after"
        />
      </div>
    </div>
  );
}

export default App;
