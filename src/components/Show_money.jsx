const Show_money = ({money_obj}) => {
//   console.log(data);
//   console.log(typeof data);
  const filteredData = money_obj.filter((item) => item.quantity>0);

  return (
    <ul>
      {filteredData.map((item) => (
        <li key={item.name}>{item.name} บาท มี {item.quantity}</li>
      ))}
    </ul>
  );
};

export { Show_money };
