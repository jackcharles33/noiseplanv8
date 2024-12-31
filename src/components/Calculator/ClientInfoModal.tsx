import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface ClientInfo {
  name: string;
  addressLine1: string;
  town: string;
  postcode: string;
}

interface ClientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientInfo: ClientInfo) => void;
}

export const ClientInfoModal: React.FC<ClientInfoModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    addressLine1: '',
    town: '',
    postcode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(clientInfo);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold text-white mb-6">Client Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Client Name
            </label>
            <Input
              value={clientInfo.name}
              onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
              required
              placeholder="Enter client name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Address Line 1
            </label>
            <Input
              value={clientInfo.addressLine1}
              onChange={(e) => setClientInfo(prev => ({ ...prev, addressLine1: e.target.value }))}
              required
              placeholder="Enter first line of address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Town
            </label>
            <Input
              value={clientInfo.town}
              onChange={(e) => setClientInfo(prev => ({ ...prev, town: e.target.value }))}
              required
              placeholder="Enter town"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Postcode
            </label>
            <Input
              value={clientInfo.postcode}
              onChange={(e) => setClientInfo(prev => ({ ...prev, postcode: e.target.value }))}
              required
              placeholder="Enter postcode"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Generate Report
        </Button>
      </form>
    </Modal>
  );
};