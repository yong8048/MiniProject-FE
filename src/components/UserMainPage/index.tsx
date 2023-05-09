import ApplicationStatus from './ApplicationStatus';
import * as S from './styles';
import Header from '../common/Header';
import { useQuery } from 'react-query';
import { getSchedule } from '../../apis/auth';

function UserMainPage() {
  // 가까운 날짜 순으로 정렬
  function sortByStartDate(a: { start_date: string }, b: { start_date: string }): number {
    const dateA = a['start_date'] ? new Date(a['start_date']).getTime() : 0;
    const dateB = b['start_date'] ? new Date(b['start_date']).getTime() : 0;
    return dateA > dateB ? 1 : -1;
  }

  // 특정 유저 연차/당직 정보
  const { data: userSchedule } = useQuery('schedule', getSchedule);

  const annualList = userSchedule?.data?.filter((item: any) => item.type === 'annual');
  const dutyList = userSchedule?.data?.filter((item: any) => item.type === 'duty');

  const today = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }).slice(0, 10);
  const filteredAnnualList = annualList
    ?.filter((item: any) => new Date(item.start_date) >= new Date(today))
    .sort(sortByStartDate);
  const filteredDutyList = dutyList
    ?.filter((item: any) => new Date(item.start_date) >= new Date(today))
    .sort(sortByStartDate);

  return (
    <>
      <Header />
      <S.UserMain>
        <ApplicationStatus title='연차 신청 현황' annualList={filteredAnnualList} />
        <ApplicationStatus title='당직 신청 현황' dutyList={filteredDutyList} />
      </S.UserMain>
    </>
  );
}

export default UserMainPage;
