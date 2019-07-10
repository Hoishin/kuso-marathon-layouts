import { useReplicant } from '../use-nodecg/use-replicant';

const scheduleRep = nodecg.Replicant('schedule')
const currentRunIndexRep = nodecg.Replicant('currentRunIndex')
export const useCurrentRun = () => {
	const [schedule] = useReplicant(scheduleRep)
	const [currentRunIndex] = useReplicant(currentRunIndexRep)
	if (!schedule || typeof currentRunIndex !== 'number') {
		return
	}
	return schedule[currentRunIndex]
}
