import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --base-color: #049e94;
    }

    div.phone-number {
        
        input {
            width: 100% !important;
        }

        &.error {
            
            input {
                border-color: red;
            }

            .flag-dropdown {
                border-color: red;
            }
        }

    }

    .ant-btn.ant-btn-primary {
            background-color: var(--base-color);
            border-color: var(--base-color);

            &:hover, &:focus {
                background-color: var(--base-color);
                border-color: var(--base-color);
            }
        }
    }

    /* span.anticon {
        color: var(--base-color);
    } */

    .ant-pagination-item-active {
        border-color: var(--base-color);
    }

    button.add-new {
        color: #ffffff;

        span.anticon {
            color: #ffffff;
        }
    }

    .Supplier__PhoneInput_Display_containerClass {
        width: auto;

        input.form-control{
            font-size: 12px;
            line-height: normal;
            height: auto;
            width: auto;
            border: 0;
            padding-left: 32px;
            background-color: transparent;

            &:disabled {
                cursor: text;
            }
        }

        div.flag-dropdown {
            border: 0;
            background: transparent;

            .arrow {
                display: none;
            }
        }
    }
`;