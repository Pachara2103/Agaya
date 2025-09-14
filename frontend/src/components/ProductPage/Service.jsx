const Item = ({ imgsrc, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-xs">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#c9c9c9]">
        <div class="flex items-center justify-center bg-[#000]  h-14 w-14 rounded-full ">
          <img src={imgsrc} class="w-[80%] h-[80%] " />
        </div>
      </div>
      <h3 className="mb-2 text-sm font-bold text-[#000] tracking-wider uppercase">
        {title}
      </h3>
      <p className="text-[12px] text-[#000]">{description}</p>
    </div>
  );
};

const Service = () => {
  const features = [
    {
      imgsrc: "https://i.postimg.cc/MKPk6t4t/icon-delivery.png",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      imgsrc: "https://i.postimg.cc/CLtvr29y/Icon-Customer-service.png",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      imgsrc: "https://i.postimg.cc/ZYQFJdHp/Icon-secure.png",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div class="py-5 w-full mt-80 mb-10">
      <div className="flex flex-row justify-center gap-35">
        {features.map((feature, index) => (
          <Item
            key={index}
            imgsrc={feature.imgsrc}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;
