'use client';

import CommunicationHub from '@/components/communication/CommunicationHub';
import { CommunicationProvider } from '@/contexts/CommunicationContext';

export default function CommunicationsPage() {
  return (
    <CommunicationProvider>
      <div className="h-screen">
        <CommunicationHub
          defaultView="inbox"
          embedded={false}
          showSidebar={true}
        />
      </div>
    </CommunicationProvider>
  );
}
