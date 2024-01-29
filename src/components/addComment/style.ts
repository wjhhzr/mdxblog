import styled from "styled-components";

export const AddCommentCard = styled.div`
    padding: 2rem;
    border: 1px solid var(--color-gray-200);
    border-radius: 8px;
    margin-bottom: 40px;
    @media (max-width: 1084px) {
        & {
            padding: 0;
            border: none;
        }
    }
    h3 {
        margin-bottom: 0;
    }
    .comment-tip {
        color: var(--color-gray-700);
        margin-bottom: 10px;
    }
    .ant-form-item {
        margin-bottom: 5px;
    }
    /* .item-wrapper { */
        padding: 10px 0;

        .item-label {
            display: block;
            color: var(--color-gray-900);
            font-weight: var(--font-weight-bold) ;
            position: relative;
            margin-bottom:5px ;
            &::before {
                content: "*";
                position: absolute;
                left: -10px;
                color: var(--color-error);
            }
        }

        input, textarea {
            background: var(--color-gray-100);
            border: none;
            padding: 0.5rem;
            border-radius: 4px;
            border: 0;
            width: 100%;
            outline: none;
        }

        textarea {
            resize: none;
        }
    /* } */

    .submit-row {
        padding: 10px 0 0;
        button {
            padding: 10px 40px ;
            border: none;
            outline: none;
            border-radius: 5px;
            background: var(--color-primary);
            color: white;
            transition: background 100ms;
        }

        button:disabled {
            background: var(--color-gray-400);
        }
    }

`;