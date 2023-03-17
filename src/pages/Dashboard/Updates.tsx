export default function Updates(props: any) {
  return (
    <div id="modal-section">
      <div
        id="overlay"
        onClick={props.closeUpdates}
        className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-60"
      />
      <div
        id="modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 bg-white"
      >
        <div id="updates" className="overflow-auto w-full h-full">
          {props.modalData?.data?.trackings[0]?.events?.length! > 0 ? (
            <table>
              <thead>
                <tr className="text-black">
                  <th className="border border-black">Date</th>
                  <th className="border border-black">Location</th>
                  <th className="border border-black">Status</th>
                  <th className="border border-black">Courier</th>
                </tr>
              </thead>
              <tbody>
                {props.modalData?.data?.trackings[0]?.events.map(
                  (update: any) => {
                    return (
                      <tr className="text-black">
                        <td className="border border-black">
                          {update.datetime}
                        </td>
                        <td className="border border-black">
                          {update.location}
                        </td>
                        <td className="border border-black">{update.status}</td>
                        <td className="border border-black">
                          {update.courierCode}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          ) : (
            <div className="text-black">No updates found</div>
          )}
        </div>
        <div className="bg-white h-7 relative border">
          <div
            id="close-btn"
            onClick={props.closeUpdates}
            className="absolute right-2 rounded-lg cursor-pointer bg-neutral-300 inline-block text-red-600"
          >
            ❌ Close
          </div>
        </div>
      </div>
    </div>
  );
}
