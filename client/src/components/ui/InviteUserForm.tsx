// import React, { useState } from 'react';
// import { useUserContext } from '@/contexts/UserContext';

// interface InviteFriendModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const InviteFriendModal: React.FC<InviteFriendModalProps> = ({ isOpen, onClose }) => {
//   const { state } = useUserContext();
//   const [inviteCode, setInviteCode] = useState<string>('');
//   const [joinCode, setJoinCode] = useState<string>('');

//   const flatCode = state.user?.flatId; // Assuming flatId can be used as the code

//   const handleJoinFlat = () => {
//     // Call API to join flat using joinCode
//     console.log('Joining flat with code:', joinCode);
//     // API call logic here...

//     // Reset join code after successful join
//     setJoinCode('');
//     onClose();
//   };

//   return (
//     <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'} bg-gray-500 bg-opacity-50`}>
//       <div className="flex items-center justify-center h-full">
//         <div className="bg-white p-5 rounded shadow-md">
//           <h2 className="text-lg font-bold">Invite a Friend</h2>
//           <p>Your Flat Code: <strong>{flatCode}</strong></p>
//           <button onClick={onClose} className="text-red-500">Close</button>

//           <div className="mt-4">
//             <input
//               type="text"
//               placeholder="Enter friend's code"
//               value={joinCode}
//               onChange={(e) => setJoinCode(e.target.value)}
//               className="border p-2 rounded w-full"
//             />
//             <button onClick={handleJoinFlat} className="mt-2 bg-blue-500 text-white p-2 rounded">
//               Join Flat
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InviteFriendModal;
