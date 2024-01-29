import { useNavigate, useParams } from 'react-router-dom';
import ReturnButton from '../buttons/ReturnButton';

const Pagination = ({ stationsCount }: { stationsCount: number }) => {
  const router = useNavigate();
  const getCurrentPage = useParams().pageNumber;
  const currentPage = Number(getCurrentPage);
  const generateArrayOfPages = Array.from(
    { length: Math.ceil(stationsCount / 10) },
    (v, i) => i + 1
  );

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pageNumber = event.target.value;
    router(`${pageNumber}`);
  };
  const paginationForm = (
    <>
      <label htmlFor='page'>Page: </label>

      <select name='page' id='page' onChange={handlePageChange}>
        <option defaultValue={currentPage}>{currentPage}</option>
        {generateArrayOfPages
          .filter((pageNumber) => pageNumber !== currentPage)
          .map((pageNumber) => (
            <option key={pageNumber} defaultValue={pageNumber}>
              {pageNumber}
            </option>
          ))}
      </select>
    </>
  );

  return <>{isNaN(currentPage) ? <ReturnButton /> : paginationForm}</>;
};

export default Pagination;
