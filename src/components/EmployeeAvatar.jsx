// components/EmployeeAvatars.jsx

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';
import { FaCircleUser } from 'react-icons/fa6';
import { imgBaseURL } from '@/utils/Constants';

const EmployeeAvatars = ({ employees, maxVisible, employeesList }) => {
    const employeeProfiles = employees
        ?.map((id) => employeesList.find((emp) => emp?.id === id))
        .filter(Boolean);
    const displayedEmployees = employeeProfiles.slice(0, maxVisible);
    const remainingCount = employees.length - displayedEmployees.length;
    if (!employeeProfiles || employeeProfiles.length === 0) {
        return <span>N/A</span>;
    }
    return (
        <DropdownMenu>
            <div className="flex items-center -space-x-2">
                {displayedEmployees.map((emp, index) => (
                    <Avatar title={emp.user?.name || 'N/A'} key={index} className="w-8 h-8 border-2 border-white">
                        <AvatarImage
                            className="object-cover"
                            src={`${imgBaseURL}${emp.user?.profilePhoto || ''}`}
                        />
                        <AvatarFallback><FaCircleUser className="bg-white text-[#d3d3d3] h-full w-full" /></AvatarFallback>
                    </Avatar>
                ))}
                {remainingCount > 0 && (
                    <DropdownMenuTrigger asChild>
                        <span className="flex items-center justify-center w-8 h-8 text-sm font-medium bg-gray-200 text-gray-700 rounded-full border-2 border-white cursor-pointer">
                            +{remainingCount}
                        </span>
                    </DropdownMenuTrigger>
                )}
            </div>
            <DropdownMenuContent align="start" className="bg-white p-2 overflow-y-auto max-h-[10rem]">
                {employeeProfiles.map((emp, index) => (
                    <DropdownMenuItem key={index} className="flex items-center">
                        <Avatar className="w-6 h-6">
                            <AvatarImage
                                className="object-cover"
                                src={`${imgBaseURL}${emp.user?.profilePhoto || ''}`}
                            />
                            <AvatarFallback className="bg-white"><FaCircleUser className="bg-white text-[#d3d3d3] h-full w-full" /></AvatarFallback>
                        </Avatar>
                        <span>{emp.user?.name || 'N/A'}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default EmployeeAvatars;
