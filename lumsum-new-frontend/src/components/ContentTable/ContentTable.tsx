import * as S from "./ContentTable.styled";

interface ContentTableProps {
  data: {
    title: string;
    value: string;
  }[];
}

const ContentTable = ({ data }: ContentTableProps) => {
  return (
    <S.ContentTable>
      <tbody>
        {data.map((field) => {
          return (
            <S.Row key={field.title}>
              <S.ColumnHead>{field.title}</S.ColumnHead>
              <S.Column>{field.value}</S.Column>
            </S.Row>
          );
        })}
      </tbody>
    </S.ContentTable>
  );
};

export default ContentTable;
