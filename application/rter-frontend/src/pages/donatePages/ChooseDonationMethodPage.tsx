import DonateCard from "@/components/DonateCard";
import Navbar from "@/components/Navbar";

const donateCards = [
  {
    title: "Donate Money",
    description:
      "Your financial support can make a big difference in the lives of those we serve. Monetary donations allow us to fund our programs and initiatives, helping us to provide essential services to those in need. Every dollar counts and we appreciate your generous support.",
    buttonDescription: "Donate Now",
    buttonRedirect: "/money",
  },
  {
    title: "Donate Other Things",
    description:
      "In addition to monetary donations, we also accept donations of goods, food, and clothing. These items can be crucial resources for those we serve, providing them with essential items and improving their quality of life. Whether it's a warm meal, a winter coat, or a piece of furniture, your donations can make a real difference.",
    buttonDescription: "Donate Items",
    buttonRedirect: "/items",
  },
];

const ChooseDonationMethodPage = () => {
  const emailExists = true;
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full w-full items-center justify-center gap-10">
        {donateCards.map((card, id) => (
          <DonateCard
            key={id}
            title={card.title}
            description={card.description}
            buttonDescription={card.buttonDescription}
            buttonRedirect={card.buttonRedirect}
            emailExists={emailExists}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseDonationMethodPage;
