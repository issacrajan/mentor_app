'use client';

import UserAddForm from '@/ui/components/user/UserAddForm';
import UserEditForm from '@/ui/components/user/UserEditForm';
import { useSearchParams } from 'next/navigation';

function UserPage() {
	const searchParms = useSearchParams();
	const id = searchParms.get('id');
	return id ? <UserEditForm id={id} /> : <UserAddForm />;
}

export default UserPage;
