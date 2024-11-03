import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

interface ProfileDetailsProps {
  header: string;
  details: Array<{ field?: string; value: string }>;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ header, details }) => {
  return (
    <div className="flex-grow bg-accent-50 shadow p-6">
      <div className="flex text-xl justify-between font-semibold text-accent-700 mb-4">
        {header}
        <button className='flex items-center'>
          <EditIcon 
          style={{fontSize: '18px'}} className="text-accent-100 bg-accent-200 rounded-xl p-0.5 ">
          </EditIcon>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-y-3">
        {details.map((detail, index) => (
          <React.Fragment key={index}>
            <span className="text-sm font-semibold text-accent-700">{detail.field}</span>
            <span className="text-sm overflow-wrap break-words text-accent-600">{detail.value}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;
