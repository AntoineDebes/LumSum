import * as S from "./TagList.styled";
interface IProps {
  tags: string[];
  colorTheme?: string;
}

const TagList = ({ tags, colorTheme, ...props }: IProps) => {
  return (
    <S.TagList {...props}>
      {tags.map((tag) => {
        return (
          <S.TagListLi key={tag}>
            <S.TagListTag colorTheme={colorTheme}>{tag}</S.TagListTag>
          </S.TagListLi>
        );
      })}
    </S.TagList>
  );
};

export default TagList;
