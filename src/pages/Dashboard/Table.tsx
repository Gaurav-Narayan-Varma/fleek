import React from "react";

interface ParcelProps {
  children: [
    { props: { children: string } },
    { props: { children: string } },
    { props: { children: string } },
    { props: { children: string } },
    { props: { children: string } }
  ];
}

export default function Table(props: any) {
  return (
    <table id="parcel-stack" className="w-11/12 mx-auto mt-5">
      <thead id="parcel-stack-header" className="text-black border-stone-300">
        <tr>
          <th className="border border-stone-300">Tracking Number</th>
          <th className="border border-stone-300">Status</th>
          <th className="border border-stone-300">Origin</th>
          <th className="border border-stone-300">Destination</th>
          <th className="border border-stone-300">Courier</th>
        </tr>
      </thead>
      <tbody className="text-black">
        {props.stage === "all"
          ? props.parcels.filter((parcel: React.ReactElement<ParcelProps>) => {
              if (parcel != null) {
                if (React.isValidElement(parcel)) {
                  return parcel.props.children[0].props.children.includes(
                    props.searchText
                  );
                }
              }
            })
          : props.parcels.filter((parcel: React.ReactElement<ParcelProps>) => {
              if (parcel != null) {
                if (React.isValidElement(parcel)) {
                  return (
                    parcel.props.children[1].props.children === props.stage &&
                    parcel.props.children[0].props.children.includes(
                      props.searchText
                    )
                  );
                }
              }
            })}
      </tbody>
    </table>
  );
}
