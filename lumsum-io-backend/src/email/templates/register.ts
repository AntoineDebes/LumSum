
export default (data: any) => {
    return `
        <html>
            <head>
                <title>Account Credential</title>
                <style>
                    body {
                        padding: 0;
                        margin: 0;
                        font-family: Arial;
                    }
            
                    .container {
                        width: calc(100% - 100px);
                        background: #049e94;
                        padding: 50px;
                    }
                    .logo {
                        margin: 0 auto;
                        margin-bottom: 50px;
                        height: 100px;
                        width: 100px;
                        border-radius: 50px;
                        background: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
            
                    .logo>img {
                        height: 70px;
                        width: 70px;
                        margin: auto;
                    }
            
                    .card {
                        background: #fff;
                        border-radius: 4px;
                        padding: 15px;
                    }
            
                    p {
                        color: #049e94;
                        margin: 0;
                        font-size: 16px;
                    }
            
                    .title {
                        font-size: 36px;
                    }
            
                    .text {
                        font-size: 14px;
                    }
            
                    .link-container {
                        text-align: center;
                        padding: 32px 0;
                    }
            
                    .link {
                        background: blue;
                        font-size: 20px;
                        color: #fff !important;
                        padding: 12px 24px;
                        font-weight: bold;
                        text-decoration: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }
            
                    table {
                        width: 100%;
                    }
            
                    title {
                        color: #049e94;
                    }
            
                    .categories {
                        text-decoration: none;
                        background-color: #049e94;
                        color: white !important;
                        border: 2px solid #049e94;
                        padding: 15px 25px;
                        border-radius: 4px;
                    }
            
                    .categories:hover {
                        background: #049e94;
                        color: #fff;
                    }
            
                    .card-content {
                        max-width: 98%;
                        margin: 25px auto;
                    }
            
                    @media only screen and (max-width: 600px) {
                        .container {
                            width: 100%;
                            background: #fff;
                            padding: 0;
                        }
            
                        .card {
                            background: blue;
                        }
            
                        .card-content {
                            max-width: 98%;
                            margin: 15px auto;
                        }
            
                        .link-container {
                            padding: 16px 0;
                        }
            
                        .link {
                            font-size: 15px;
                            padding: 8px 16px;
                        }
                    }
            
                    @media only screen and (max-width: 400px) {}
                </style>
            </head>
            
            <body>
                <div class="container">
                    <div class="logo">
                        <img src="https://www.lumsum.io/lumsum.png" alt="lumsum" />
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <p>Hey <b>${data.name}</b></p>
                            <br />
                            <p>Welcome to Lumsum's community.</p>
                            <p>The UAE's fastest growing Building material <br /> suppliers directory.</p>
                            <p>Let's get you started on your next project by going <br /> through our top categories and choosing
                                the
                                <br /> suppliers you want.
                            </p>
                            <p>Don't forget to rate them, and let us know how they <br />did.</p>
                            <br />
                            <p style="text-align:center;"> <a class="categories" href="https://www.lumsum.io/categories"
                                    target="_blank">The Categories</a></p>
                            <br />
                            {{!-- <p>Account Credential</p>
                            <div>
                                <table>
                                    <tr>
                                        <td colspan="2">
                                            <p><b>Email: </b><i>${data.email}</i></p>
                                            <p><b>Password: </b><i>${data.password}</i></p>
                                        </td>
                                    </tr>
                                </table>
                            </div> --}}
                            <p>Yours Truly,</p>
                            <br />
                            <p>Mansour</p>
                            <p>Head of Attention Supply</p>
                        </div>
                    </div>
                </div>
            </body>       
        </html>
  `;
};