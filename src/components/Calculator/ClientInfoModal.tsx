import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface ClientInfo {
  name: string;
  addressLine1: string;
  town: string;
  postcode: string;
  assessmentDate: string;
  assessmentPosition: string;
}

interface ClientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientInfo: ClientInfo) => void;
}

export const ClientInfoModal: React.FC<ClientInfoModalProps> = ({ isOpen, onClose, onSubmit }) => {
  // Format today's date as YYYY-MM-DD without using date-fns
  const formatTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    addressLine1: '',
    town: '',
    postcode: '',
    assessmentDate: formatTodayDate(), // Default to today's date without date-fns
    assessmentPosition: ''
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
          
          {/* New fields for assessment date and position */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Assessment Date
            </label>
            <Input
              type="date"
              value={clientInfo.assessmentDate}
              onChange={(e) => setClientInfo(prev => ({ ...prev, assessmentDate: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Assessment Position
            </label>
            <Input
              value={clientInfo.assessmentPosition}
              onChange={(e) => setClientInfo(prev => ({ ...prev, assessmentPosition: e.target.value }))}
              required
              placeholder="e.g. First floor rear window of neighbour to the left"
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