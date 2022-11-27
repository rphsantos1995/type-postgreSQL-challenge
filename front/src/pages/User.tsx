

export default function User() {

  return (
    <main>
      <button>Logout</button>
      <h4>User Balance: </h4>
      <table>
      <caption>Transactions</caption>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Creditor</th>
            <th>Reciever</th>
            <th>Type</th>
          </tr>
        </tbody>
      </table>
      <section>
        <h6>New Transaction</h6>
        <label htmlFor="uname">Username:</label>
        <input type="text" id="uname" name="uname"/> <br/>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" name="amount"/>
        <button>Apply</button>
      </section>
    </main>
  )

}