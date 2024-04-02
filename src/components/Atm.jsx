import { useEffect, useState } from "react";
import { Show_money } from "./Show_money";
import { Receipt } from "./Receipt";

const Atm = () => {
  const showlog = true; /////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////ทำตรงนี้ต่อ
  const [showReceipt, setShowReceipt] = useState(false);

  const [info, setInfo] = useState("");
  const [money_obj, set_money_obj] = useState([
    { name: "bank1000", quantity: 1 },
    { name: "bank500", quantity: 1 },
    { name: "bank100", quantity: 1 },
    { name: "bank50", quantity: 1 },
    { name: "bank20", quantity: 1 },
    { name: "bank10", quantity: 1 },
    { name: "bank5", quantity: 1 },
    { name: "bank2", quantity: 1 },
    { name: "bank1", quantity: 1 },
  ]);
  const [dispensMoneyObj, setDispensMoneyObj] = useState([
    { name: "bank1000", quantity: 0 },
    { name: "bank500", quantity: 0 },
    { name: "bank100", quantity: 0 },
    { name: "bank50", quantity: 0 },
    { name: "bank20", quantity: 0 },
    { name: "bank10", quantity: 0 },
    { name: "bank5", quantity: 0 },
    { name: "bank2", quantity: 0 },
    { name: "bank1", quantity: 0 },
  ]);

  //form ฝากเงินเเต่ละ bank

  const [Inbank1000, setInBank1000] = useState(0);
  const handleInBank1000Change = (e) => {
    setInBank1000(e.target.value);
  };
  const [Inbank500, setInBank500] = useState(0);
  const handleInBank500Change = (e) => {
    setInBank500(e.target.value);
  };
  const [Inbank100, setInBank100] = useState(0);
  const handleInBank100Change = (e) => {
    setInBank100(e.target.value);
  };
  const [Inbank50, setInBank50] = useState(0);
  const handleInBank50Change = (e) => {
    setInBank50(e.target.value);
  };
  const [Inbank20, setInBank20] = useState(0);
  const handleInBank20Change = (e) => {
    setInBank20(e.target.value);
  };
  const [Inbank10, setInBank10] = useState(0);
  const handleInBank10Change = (e) => {
    setInBank10(e.target.value);
  };
  const [Inbank5, setInBank5] = useState(0);
  const handleInBank5Change = (e) => {
    setInBank5(e.target.value);
  };
  const [Inbank2, setInBank2] = useState(0);
  const handleInBank2Change = (e) => {
    setInBank2(e.target.value);
  };
  const [Inbank1, setInBank1] = useState(0);
  const handleInBank1Change = (e) => {
    setInBank1(e.target.value);
  };

  // form ถอนเงินเเต่ละ bank
  const [outAmount, setOutAmount] = useState(0);
  const handleOutAmountChange = (e) => {
    if (e.target.value < 0) e.target.value = Math.abs(e.target.value);
    setOutAmount(e.target.value);
  };

  // เกี่ยวกับ total money
  const [total_money, set_total_money] = useState(0);
  const update_total_money = () => {
    let temp_moneyObj = structuredClone(money_obj);
    let banks = temp_moneyObj.map((o) => o.quantity);
    const bankType = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
    let totalQuantity = 0;
    for (let index = 0; index < bankType.length; index++) {
      totalQuantity += banks[index] * bankType[index];
    }
    set_total_money(totalQuantity);
    if (showlog) console.log("เเบงค์ทั้งหมดในตู้", banks);
    if (showlog) console.log("เงินในตู้ทั้งหมด", totalQuantity);
    if (showlog) console.log(money_obj);
  };
  useEffect(() => {
    update_total_money();
  }, [money_obj]); // ผมก็เม่เข้าใจเหมือนกัน ว่าทำไมต้องเอามาซ้อน array ???? รู้เเค่ถ้าไม่ซ้อนมันจะไม่ real time

  const depositeBtnClick = () => {
    //ยังไม่เส็ด !!
    let temp_moneyObj = structuredClone(money_obj);
    let temp_moneyArr = temp_moneyObj.map((i) => i.quantity);
    temp_moneyArr[0] += Number(Inbank1000);
    temp_moneyArr[1] += Number(Inbank500);
    temp_moneyArr[2] += Number(Inbank100);
    temp_moneyArr[3] += Number(Inbank50);
    temp_moneyArr[4] += Number(Inbank20);
    temp_moneyArr[5] += Number(Inbank10);
    temp_moneyArr[6] += Number(Inbank5);
    temp_moneyArr[7] += Number(Inbank2);
    temp_moneyArr[8] += Number(Inbank1);
    const bankTypeArr = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
    if (showlog)
      console.log("เงินในตู้หลังจากฝาก เเสดงเเบบ array", temp_moneyArr);
    let newAtmBankState = [];
    for (let i = 0; i < bankTypeArr.length; i++) {
      newAtmBankState[i] = {
        name: "bank" + String(bankTypeArr[i]),
        quantity: temp_moneyArr[i],
      };
    }
    console.log("state เงินใหม่หลังจาก update เส็ดเเล้ว", newAtmBankState);
    set_money_obj(newAtmBankState);
    setShowReceipt(false);
  };

  const withdrawBtnClick = () => {
    setInfo("");
    //clone ค่ามาจาก react state
    let saved_moneyObj = structuredClone(money_obj);
    let temp_moneyObj = structuredClone(money_obj);
    let temp_outAmount = outAmount;

    if (temp_outAmount == 0) {
      setInfo("ถอนเงิน 0 บาท ไม่ได้");
      return;
    }

    //กรณีถอนเงินมากกว่าที่ตู้ มี
    if (temp_outAmount > total_money) {
      setInfo("เงินในตู้ไม่พอสำหรับการถอน");
      return;
    }

    // เเตกเงินไว้ใน array ตามเเบบฉบับ alien
    let atmMoneyArr = temp_moneyObj.map((o) => o.quantity);
    const bankTypeArr = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
    let outBankArr = [];
    //ลดรูปการคำนวนในเเต่ละ bank
    for (let i = 0; i < bankTypeArr.length; i++) {
      let wantThatbank = Math.floor(temp_outAmount / bankTypeArr[i]);
      if (wantThatbank > atmMoneyArr[i]) {
        //กรณีที่ bank ดังกล่าว ไม่พอ
        outBankArr[i] = atmMoneyArr[i]; // bank นั้นๆ ออกเท่าที่มี // update out
        temp_outAmount -= atmMoneyArr[i] * bankTypeArr[i]; // หักเงินออกจาก temp เท่าที่ bank นั้นๆ มี // update temp
        atmMoneyArr[i] = 0; //bank นั้นๆ จ่ายออกไปหมด bank นั้นๆ ก็ต้องเหลือ 0 // update atm
      } else {
        //กรณีที่ bank ดังกล่าวพอ
        outBankArr[i] = wantThatbank; //เอา bank นั้นๆ ออกเท่าที่ต้องการ //update out
        temp_outAmount -= wantThatbank * bankTypeArr[i]; // update temp
        atmMoneyArr[i] -= wantThatbank; //update atm bank
      }
      // ต้องมีอะไรอีก เเต่ยังคิดไม่ออก
    }
    if (temp_outAmount > 0) {
      if (showlog) {
        console.log("bank ย่อยของ atm เรา ขาดไปอีก" + String(temp_outAmount));
        setInfo(
          "bank ย่อยของ atm เรา ขาดไปอีก" +
            String(temp_outAmount) +
            "บาท กรุณาถอนเป็นจำนวนเงินถ้วนๆ"
        );
        // !! ยกเลิกการถอนเงินที่ทำมาทั้งหมด
        return;
      }
    }
    setInfo("ถอนเงินสำเร็จ");
    if (showlog) console.log("เงินที่ออกเเบบ array", outBankArr);
    if (showlog) console.log("เงินที่เหลือเเบบ array", atmMoneyArr);
    // ต้องเอาค่าไป set ลง react state อีก
    let newAtmBankState = [];
    for (let i = 0; i < bankTypeArr.length; i++) {
      newAtmBankState[i] = {
        name: "bank" + String(bankTypeArr[i]),
        quantity: atmMoneyArr[i],
      };
    }

    let outBankObj = [];
    for (let i = 0; i < outBankArr.length; i++) {
      outBankObj[i] = {
        name: "bank" + String(bankTypeArr[i]),
        quantity: outBankArr[i],
      };
    }

    if (showlog) console.log("state ใหม่ ที่รอ update", newAtmBankState);
    set_money_obj(newAtmBankState);
    setShowReceipt(true);
    if (showlog) console.log("เงินที่ออกมาในรูปเเบบ object", outBankObj);
    setDispensMoneyObj(outBankObj);
  };

  return (
    <>
      <p>เงินรวมในตู้ {total_money} บาท</p>
      <Show_money money_obj={money_obj} />
      <label>bank1000</label>
      <input
        type="number"
        min={0}
        value={Inbank1000}
        onChange={handleInBank1000Change}
      />
      <br />

      <label>bank500</label>
      <input
        type="number"
        min={0}
        value={Inbank500}
        onChange={handleInBank500Change}
      />
      <br />

      <label>bank100</label>
      <input
        type="number"
        min={0}
        value={Inbank100}
        onChange={handleInBank100Change}
      />
      <br />

      <label>bank50</label>
      <input
        type="number"
        min={0}
        value={Inbank50}
        onChange={handleInBank50Change}
      />
      <br />

      <label>bank20</label>
      <input
        type="number"
        min={0}
        value={Inbank20}
        onChange={handleInBank20Change}
      />
      <br />

      <label>bank10</label>
      <input
        type="number"
        min={0}
        value={Inbank10}
        onChange={handleInBank10Change}
      />
      <br />

      <label>bank5</label>
      <input
        type="number"
        min={0}
        value={Inbank5}
        onChange={handleInBank5Change}
      />
      <br />

      <label>bank2</label>
      <input
        type="number"
        min={0}
        value={Inbank2}
        onChange={handleInBank2Change}
      />
      <br />

      <label>bank1</label>
      <input
        type="number"
        min={0}
        value={Inbank1}
        onChange={handleInBank1Change}
      />
      <br />

      <button onClick={depositeBtnClick}>ฝากเงิน</button>
      <hr />
      <p>{info}</p>
      <input
        type="number"
        min={0}
        value={outAmount}
        onChange={handleOutAmountChange}
      />
      <button onClick={withdrawBtnClick}>ถอนเงิน</button>
      <hr />
      {showReceipt ? <Receipt banks={dispensMoneyObj} /> : <></>}
    </>
  );
};

export { Atm };
