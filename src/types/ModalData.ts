export default interface ModalData {
    data: {
      trackings: {
        tracker: {
          trackerId: string;
          trackingNumber: string;
          isSubscribed: boolean;
          shipmentReference: string;
          createdAt: string;
        };
        shipment: {
          shipmentId: string;
          statusCode: string;
          statusCategory: string;
          statusMilestone: string;
          delivery: {
            estimatedDeliveryDate: string | null;
            service: string | null;
            signedBy: string | null;
          };
          trackingNumbers: {
            tn: string;
          }[];
          recipient: {
            name: string | null;
            address: string | null;
            postCode: string | null;
            city: string | null;
            subdivision: string | null;
          };
        };
        events: {
          eventId: string;
          trackingNumber: string;
          eventTrackingNumber: string;
          status: string;
          occurrenceDatetime: string;
          order: string | null;
          datetime: string;
          hasNoTime: boolean;
          utcOffset: string | null;
          location: string;
          sourceCode: string;
          courierCode: string;
          statusCode: string | null;
          statusCategory: string | null;
          statusMilestone: string;
        }[];
      }[];
    };
  }