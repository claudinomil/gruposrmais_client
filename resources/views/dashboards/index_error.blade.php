
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KingHost - Serviço indisponível</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #ffffff;
            color: #333333;
            min-height: 100vh;
        }

        .topbar {
            height: 75px;
            border-bottom: 1px solid #eeeeee;
            display: flex;
            align-items: center;
            padding: 0 8%;
        }

        .logo {
            font-size: 30px;
            font-weight: 800;
            color: #f15a24;
            letter-spacing: -1.5px;
        }

        .logo span {
            color: #303b49;
        }

        .content {
            min-height: calc(100vh - 145px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
        }

        .error {
            width: 100%;
            max-width: 680px;
            text-align: center;
        }

        .illustration {
            margin-bottom: 25px;
        }

        .illustration svg {
            width: 150px;
            height: 130px;
        }

        .code {
            color: #f15a24;
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 3px;
            margin-bottom: 12px;
        }

        h1 {
            font-size: 32px;
            color: #303b49;
            margin-bottom: 20px;
        }

        .description {
            color: #737b84;
            font-size: 16px;
            line-height: 1.8;
            max-width: 550px;
            margin: 0 auto;
        }

        .details {
            margin: 35px auto 0;
            max-width: 520px;
            background: #f8f9fa;
            border: 1px solid #eeeeee;
            border-radius: 6px;
            padding: 20px;
            text-align: left;
        }

        .details strong {
            color: #303b49;
            font-size: 14px;
        }

        .details p {
            color: #858b92;
            font-size: 13px;
            line-height: 1.7;
            margin-top: 8px;
        }

        .footer {
            height: 70px;
            border-top: 1px solid #eeeeee;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #a0a5aa;
            font-size: 12px;
            text-align: center;
            padding: 10px;
        }

        @media(max-width: 600px) {
            .topbar {
                padding: 0 20px;
            }

            h1 {
                font-size: 25px;
            }

            .description {
                font-size: 14px;
            }
        }
    </style>
</head>

<body>

    <header class="topbar">
        <div class="logo">King<span>Host</span></div>
    </header>

    <main class="content">

        <section class="error">

            <div class="illustration">

                <svg viewBox="0 0 160 140" fill="none"
                     xmlns="http://www.w3.org/2000/svg">

                    <rect x="25" y="15" width="110" height="75"
                          rx="7" fill="#F1F3F5"/>

                    <rect x="35" y="25" width="90" height="55"
                          rx="3" fill="white"/>

                    <path d="M55 105H105" stroke="#D5D9DD"
                          stroke-width="5" stroke-linecap="round"/>

                    <path d="M80 90V105" stroke="#D5D9DD"
                          stroke-width="5"/>

                    <circle cx="80" cy="52" r="17"
                            fill="#F15A24"/>

                    <path d="M80 42V54"
                          stroke="white" stroke-width="3"
                          stroke-linecap="round"/>

                    <circle cx="80" cy="61" r="2"
                            fill="white"/>

                    <path d="M20 115L30 105M140 115L130 105"
                          stroke="#F15A24" stroke-width="3"
                          stroke-linecap="round"/>

                </svg>

            </div>

            <div class="code">ERRO HTTP 503</div>

            <h1>Ops! Estamos temporariamente indisponíveis.</h1>

            <p class="description">
                No momento, não foi possível estabelecer uma conexão
                com o servidor que hospeda este site.
                Nossa infraestrutura pode estar passando por uma
                instabilidade ou manutenção temporária.
            </p>

            <div class="details">

                <strong>O que está acontecendo?</strong>

                <p>
                    O servidor não está disponível para atender à sua
                    solicitação neste momento (Service Temporarily
                    Unavailable).
                </p>

                <p>
                    Por favor, aguarde alguns instantes e tente
                    acessar novamente.
                </p>

            </div>

        </section>

    </main>

    <footer class="footer">
        Serviço de hospedagem KingHost
    </footer>

</body>
</html>
