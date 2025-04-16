import { toast } from '@betfinio/components/ui';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { mfQueryClient } from '../config/query';
import { useLoadRemoteModule } from '../lib/query/mf';
import type { ContextConfigModule, ContextMemberProfileComponentModule } from '../types';

function Profile() {
	return <div className="p-4">Profile</div>;
}

export default Profile;
