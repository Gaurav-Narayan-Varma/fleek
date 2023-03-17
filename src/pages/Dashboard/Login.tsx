export default function Login(props: any) {
  return (
    <div>
      <div
        id="pw-overlay"
        className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-60"
      />
      <div
        id="pw-modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 bg-white"
      >
        <div className="text-center mt-40">
          <label className="text-black">Enter password: </label>
          <input
            type="text"
            onKeyDown={props.checkPassword}
            className="bg-white border border-stone-300 text-black rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
