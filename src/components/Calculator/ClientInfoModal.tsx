import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface CustomerInfo {
  name: string;
  addressLine1: string;
  town: string;
  postcode: string;
  assessmentDate: string;
  assessmentPosition: string;
  annotatedPhoto?: File;
}

interface CustomerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customerInfo: CustomerInfo) => void;
}

export const ClientInfoModal: React.FC<CustomerInfoModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const formatTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    addressLine1: '',
    town: '',
    postcode: '',
    assessmentDate: formatTodayDate(),
    assessmentPosition: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomerInfo(prev => ({ ...prev, annotatedPhoto: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customerInfo);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold text-white mb-6">Customer Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Customer Name
            </label>
            <Input
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
              required
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Address Line 1
            </label>
            <Input
              value={customerInfo.addressLine1}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, addressLine1: e.target.value }))}
              required
              placeholder="Enter first line of address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Town
            </label>
            <Input
              value={customerInfo.town}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, town: e.target.value }))}
              required
              placeholder="Enter town"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Postcode
            </label>
            <Input
              value={customerInfo.postcode}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, postcode: e.target.value }))}
              required
              placeholder="Enter postcode"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Assessment Date
            </label>
            <Input
              type="date"
              value={customerInfo.assessmentDate}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, assessmentDate: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Assessment Position
            </label>
            <Input
              value={customerInfo.assessmentPosition}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, assessmentPosition: e.target.value }))}
              required
              placeholder="e.g. First floor rear window of neighbour to the left"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Annotated Planning Application Photo
            </label>
            <Input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="file:text-white"
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
