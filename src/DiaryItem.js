import React, { useEffect, useRef, useState } from "react";

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  created_date,
  onRemove,
  onEdit,
}) => {
  useEffect(() => {
    console.log(`${id}번 째 아이템 렌더!`);
  });
  const [isEdit, setIsEdit] = useState(false);
  const toggledIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제 하겠습니까?`)) {
      onRemove(id);
    }
  };

  const handQuiteEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggledIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handQuiteEdit}>취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggledIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);
