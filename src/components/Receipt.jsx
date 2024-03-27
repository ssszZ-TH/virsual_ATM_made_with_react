import "./Receipt.css";
import Logo from "./Logo.svg";
// เดี๋ยวทำให้มันมีเวลาในใบเสร็จ

function Receipt(props) {
  const showlog = true;
  let banks = props.banks;
  if (showlog) console.log("banks ที่รับเข้ามาใน component", banks);
  if (showlog)
    console.log(
      "ลองเอาไป map เล่นๆ จะได้เเบบนี้",
      banks.map((i) => i.name + "=" + i.quantity)
    );

  return (
    <>
      <div className="text-center mt-3">
        <div>
          <section className="receipt container-ticket">
            <div className="ticket">
              <div className="head-ticket">
                <p className="x-bold">
                  <img src={Logo} alt="Logo" width={64} />
                  <br />
                  เงินในบัญชีร้องไห้หมดเเล้ว
                </p>
                <p className="bold">นางสาว บลาๆๆ</p>
                <p className="bold">Tel: +66 00 000 0000</p>
                <br />
                <p className="bold">P.O BOX. 90420-80100 MSA</p>
                <p>Date :12/11/2023 4:16:34 pm</p>
                <p>
                  Receipt code : เดี๋ยวค่อยใส่ให้มัน random จริงๆ วันหลังละกัน
                </p>
              </div>
              <div className="body-ticket">
                <div className="produits">
                  <div className="col2">
                    <p>Bank</p>
                    <p className="prix">จำนวน</p>
                  </div>
                  <div className="hr-sm"></div>

                  {banks.map((bank) => (
                    <div className="col2" key={bank.name}>
                      <p>{bank.name}</p>
                      <p className="prix">{bank.quantity}</p>
                    </div>
                  ))}

                  <br />
                  <div className="col2">
                    <p>Payment Method</p>
                    <p className="prix">Cash</p>
                  </div>
                  <div className="col2">
                    <p>Amount recived</p>
                    <p className="prix">Ksh 500</p>
                  </div>
                  <div className="col2">
                    <p>Balance</p>
                    <p className="prix">100</p>
                  </div>
                </div>
                <div className="hr-lg"></div>
                <div className="carte">
                  <p className="title-carte">Customer: munuhe</p>
                  <br />
                  <p>Served by: stephen</p>
                </div>
                <div className="hr-lg"></div>
              </div>
              <div className="footer-ticket">
                <p className="title-footer">THANK YOU</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export { Receipt };