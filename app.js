

            class Mines{


             constructor() {

                this.dinheiro = localStorage.getItem('Saldo')

                if(!localStorage.getItem('Saldo')) {

                    localStorage.setItem('Saldo', 10000)
                    window.location.reload()

                }

                }

             saldo() {

                //LOGICA DO SALDO 

                document.querySelector('#dinheiro_disponivel').innerHTML = this.dinheiro

            }

            addSaldo() {

                localStorage.setItem('Saldo', 10000)
                window.location.reload()  


            }


            validacaoInicialJogo(){

                //LOGICA VERIFICAR SE SALDO INFORMADO NO INPUT E VALIDO
                let valorAposta = document.querySelector('#valorAposta').value

                if(valorAposta == null || valorAposta == '' || valorAposta == undefined) {

                    
                    document.querySelector('#valorAposta').style.fontSize = '25px'
                    document.querySelector('#valorAposta').placeholder = 'Ops Campo Vazio Preencha'
                }


                   else {

                    let validarSaldoMenorDoQueTem = this.dinheiro - document.querySelector('#valorAposta').value

                    localStorage.setItem('Saldo', validarSaldoMenorDoQueTem)

                    if(validarSaldoMenorDoQueTem < 0) {

                        document.querySelector('#valorAposta').value = ''
                        document.querySelector('#valorAposta').style.fontSize = '25px'
                        document.querySelector('#valorAposta').placeholder = 'Ops Saldo Insuficiente'

                    } else{

                       //TUDO CERTO SOBRE O SALDO INFORMADO CHAMAR A PROXIMA ETAPA
                       this.iniciarJogo(valorAposta)
                    }
                    

                 }



            }

            iniciarJogo(valorAposta) {

                //LOGICA INICIALIZACAO DO JOGO

                //AUDIO
                let audio = new Audio()
                audio.src = 'audio/audio1.mp3'
                audio.play()

                //CRIANDO E ATRIBUINDO VALORES AO ELEMENTO

                document.querySelector('#valorAposta').value = ''
                document.querySelector('#valorAposta').placeholder = 'Jogo Iniciado Boa Sorte'
                document.querySelector('#valorAposta').style.fontSize = '25px'
                document.querySelector('#botao_jogar').remove()
                let saldoAtualizado = this.dinheiro -= valorAposta
                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                
                //REMOVENDO CAMPOS EM DETERMINADO TEMPO
                setTimeout(() => {
                    document.querySelector('#descValorAposta').remove()
                    document.querySelector('#valorAposta').remove()

                }, 500)

                //ADICIONANDO CAMPOS EM DETERMINADO TEMPO
                setTimeout(() => {


                    let botaoCashout = document.createElement('button')
                    botaoCashout.className = 'btn btn-danger mt-2 w-50'
                    botaoCashout.style.fontSize = '25px'
                    botaoCashout.id = 'botaoAtualizandoCashout'
                    botaoCashout.innerHTML = `Seu Cashout e: ${valorAposta} Clique Para Parar`
                    botaoCashout.onclick = () => {

                        //LOGICA AUDIO CASHOUT(VITORIA)
                        let audio = new Audio()
                        audio.src = 'audio/audio4.mp3'
                        audio.play()

                        

                        //ATUALIZAR SALDO APOS CASHOUT

                        let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(valorAposta)
                        this.dinheiro = saldoAtualizado
                        document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                        botaoCashout.remove()
                        //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                        //-----------------------------------------------------------
                        this.reiniciarJogoVitoria()

                    }

                
                    
                    document.querySelector('#botao_cashout').appendChild(botaoCashout)
                    

                }, 500)

                this.logicaMatematica(valorAposta)



            }

            reiniciarJogo() {

                let audio = new Audio()
                audio.src = 'audio/audio5.mp3'
                audio.play()

                setTimeout(() => {

                    window.location.reload()



                },3000)


            }

            reiniciarJogoVitoria() {

                setTimeout(() => {

                    window.location.reload()



                },3000)


            }

            logicaMatematica(valorApostado){
                
                let numeroRandomico1 = Math.floor(Math.random() * 3)
                let numeroRandomico2 = Math.floor(Math.random() * 3)
                let numeroRandomico3 = Math.floor(Math.random() * 3)
                let numeroRandomico4 = Math.floor(Math.random() * 3)
                let numeroRandomico5 = Math.floor(Math.random() * 3)
                let numeroRandomico6 = Math.floor(Math.random() * 3)
                let numeroRandomico7 = Math.floor(Math.random() * 3)

               //Encurtar Codigos Console Verificar Onde Esta Bomba
               for(let i = 1; i <= 7; i++) {

                    console.log(`A Bomba ${i} Esta No Quadrado ${eval("numeroRandomico" + i)}`)

               }
                
                

                this.logicaJogo1(numeroRandomico1,numeroRandomico2,numeroRandomico3,numeroRandomico4,numeroRandomico5,
                numeroRandomico6, numeroRandomico7, valorApostado  )
                

            }


            logicaJogo1(num1,num2,num3,num4,num5,num6,num7, valor) {

                
                let bomba = null


                switch(num1) {


                    case 0:  bomba = 1
                    break
                    case 1:  bomba = 2
                    break
                    case 2:  bomba = 3
                    break

                }
                

                document.querySelector('#campo_1').addEventListener('click', () => {


                     try{   
                        
                        if(bomba == 1) {


                            document.querySelector('#campo_1').innerHTML = '💣'
                            document.querySelector('#campo_2').id = 'null'
                            document.querySelector('#campo_3').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
                            
    
                        } else {

                            document.querySelector('#campo_2').id = 'null'
                            document.querySelector('#campo_3').id = 'null'
    
                            document.querySelector('#campo_1').innerHTML = '💎'

    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()

                            //MULTIPLICACAO ODD

                            let oddAtualizada = Math.floor((valor * 1.20))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo2(num2,num3,num4,num5,num6,num7,oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {


                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                this.reiniciarJogoVitoria()

        
        
                            }
                            
                            
    
                        }

                     }catch {

                            

                     }

                 


                    
                })

                document.querySelector('#campo_2').addEventListener('click', () => {

                    try{
                        if(bomba == 2) {

                            document.querySelector('#campo_2').innerHTML = '💣'
                            document.querySelector('#campo_1').id = 'null'
                            document.querySelector('#campo_3').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {

                            document.querySelector('#campo_1').id = 'null'
                            document.querySelector('#campo_3').id = 'null'
    
                            document.querySelector('#campo_2').innerHTML = '💎'
    
    
                            //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
    
                            
                            let oddAtualizada = Math.floor((valor * 1.20))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo2(num2,num3,num4,num5,num6,num7,oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()

                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
    
                        }

                    }

                    catch {

                        
                    }
                    

                    


                })

                document.querySelector('#campo_3').addEventListener('click', () => {

                    try{

                        if(bomba == 3) {

                            document.querySelector('#campo_3').innerHTML = '💣'
                            document.querySelector('#campo_1').id = 'null'
                            document.querySelector('#campo_2').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {
                            document.querySelector('#campo_1').id = 'null'
                            document.querySelector('#campo_2').id = 'null'
    
                            document.querySelector('#campo_3').innerHTML = '💎'
    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
                            

                            let oddAtualizada = Math.floor((valor * 1.20))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo2(num2,num3,num4,num5,num6,num7,oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {


                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()
                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
                        }

                    }
                    catch {

                        


                    }



                    
                })





            }

            //TRABALHAR AQUI
            logicaJogo2(num_2,num_3,num_4,num_5,num_6,num_7, ValorApostado1x) {




                let bomba = null


                switch(num_2) {


                    case 0:  bomba = 1
                    break
                    case 1:  bomba = 2
                    break
                    case 2:  bomba = 3
                    break

                }
                

                document.querySelector('#campo_4').addEventListener('click', () => {


                     try{   
                        
                        if(bomba == 1) {


                            document.querySelector('#campo_4').innerHTML = '💣'
                            document.querySelector('#campo_5').id = 'null'
                            document.querySelector('#campo_6').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
                            
    
                        } else {

                            document.querySelector('#campo_5').id = 'null'
                            document.querySelector('#campo_6').id = 'null'
    
                            document.querySelector('#campo_4').innerHTML = '💎'

    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()

                            //MULTIPLICACAO ODD

                            let oddAtualizada = Math.floor((ValorApostado1x * 1.80))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo3(num_3,num_4,num_5,num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                 //LOGICA AUDIO CASHOUT(VITORIA)
                                 let audio = new Audio()
                                 audio.src = 'audio/audio4.mp3'
                                 audio.play()                                                    
                                

                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                this.reiniciarJogoVitoria()

        
        
                            }
                            
                            
    
                        }

                     }catch {

                            

                     }

                 


                    
                })

                document.querySelector('#campo_5').addEventListener('click', () => {

                    try{
                        if(bomba == 2) {

                            document.querySelector('#campo_5').innerHTML = '💣'
                            document.querySelector('#campo_4').id = 'null'
                            document.querySelector('#campo_6').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {

                            document.querySelector('#campo_4').id = 'null'
                            document.querySelector('#campo_6').id = 'null'
    
                            document.querySelector('#campo_5').innerHTML = '💎'
    
    
                            //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
    
                            
                            let oddAtualizada = Math.floor((ValorApostado1x * 1.80))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo3(num_3,num_4,num_5,num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
    
                        }

                    }

                    catch {

                        
                    }
                    

                    


                })

                document.querySelector('#campo_6').addEventListener('click', () => {

                    try{

                        if(bomba == 3) {

                            document.querySelector('#campo_6').innerHTML = '💣'
                            document.querySelector('#campo_4').id = 'null'
                            document.querySelector('#campo_5').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {
                            document.querySelector('#campo_4').id = 'null'
                            document.querySelector('#campo_5').id = 'null'
    
                            document.querySelector('#campo_6').innerHTML = '💎'
    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
                            

                            let oddAtualizada = Math.floor((ValorApostado1x * 1.80))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo3(num_3,num_4,num_5,num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                 //LOGICA AUDIO CASHOUT(VITORIA)
                                 let audio = new Audio()
                                 audio.src = 'audio/audio4.mp3'
                                 audio.play()                                                        
                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()

        
        
                            }
    
                        }

                    }
                    catch {

                        


                    }



                    
                })


            }

            logicaJogo3(num_3,num_4,num_5,num_6,num_7, ValorApostado2x) {


                let bomba = null


                switch(num_3) {


                    case 0:  bomba = 1
                    break
                    case 1:  bomba = 2
                    break
                    case 2:  bomba = 3
                    break

                }
                

                document.querySelector('#campo_7').addEventListener('click', () => {


                     try{   
                        
                        if(bomba == 1) {


                            document.querySelector('#campo_7').innerHTML = '💣'
                            document.querySelector('#campo_8').id = 'null'
                            document.querySelector('#campo_9').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
                            
    
                        } else {

                            document.querySelector('#campo_8').id = 'null'
                            document.querySelector('#campo_9').id = 'null'
    
                            document.querySelector('#campo_7').innerHTML = '💎'

    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()

                            //MULTIPLICACAO ODD

                            let oddAtualizada = Math.floor((ValorApostado2x * 2.80))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo4(num_4,num_5,num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
                            
                            
    
                        }

                     }catch {

                            

                     }

                 


                    
                })

                document.querySelector('#campo_8').addEventListener('click', () => {

                    try{
                        if(bomba == 2) {

                            document.querySelector('#campo_8').innerHTML = '💣'
                            document.querySelector('#campo_7').id = 'null'
                            document.querySelector('#campo_9').id = 'null'
                            
                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {

                            document.querySelector('#campo_7').id = 'null'
                            document.querySelector('#campo_9').id = 'null'
    
                            document.querySelector('#campo_8').innerHTML = '💎'
    
    
                            //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
    
                            
                            let oddAtualizada = Math.floor((ValorApostado2x * 2.80))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo4(num_4,num_5,num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                 //LOGICA AUDIO CASHOUT(VITORIA)
                                 let audio = new Audio()
                                 audio.src = 'audio/audio4.mp3'
                                 audio.play()                               
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
    
                        }

                    }

                    catch {

                        
                    }
                    

                    


                })

                document.querySelector('#campo_9').addEventListener('click', () => {

                    try{

                        if(bomba == 3) {

                            document.querySelector('#campo_9').innerHTML = '💣'
                            document.querySelector('#campo_8').id = 'null'
                            document.querySelector('#campo_7').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {
                            document.querySelector('#campo_7').id = 'null'
                            document.querySelector('#campo_8').id = 'null'
    
                            document.querySelector('#campo_9').innerHTML = '💎'
    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
                            

                            let oddAtualizada = Math.floor((ValorApostado2x * 2.80))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo4(num_4,num_5,num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()                                
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
                        }

                    }
                    catch {

                        


                    }



                    
                })



            }

            logicaJogo4(num_4,num_5,num_6,num_7, ValorApostado3x) {


                let bomba = null


                switch(num_4) {


                    case 0:  bomba = 1
                    break
                    case 1:  bomba = 2
                    break
                    case 2:  bomba = 3
                    break

                }
                

                document.querySelector('#campo_10').addEventListener('click', () => {


                     try{   
                        
                        if(bomba == 1) {


                            document.querySelector('#campo_10').innerHTML = '💣'
                            document.querySelector('#campo_11').id = 'null'
                            document.querySelector('#campo_12').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
                            
    
                        } else {

                            document.querySelector('#campo_11').id = 'null'
                            document.querySelector('#campo_12').id = 'null'
    
                            document.querySelector('#campo_10').innerHTML = '💎'

    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()

                            //MULTIPLICACAO ODD

                            let oddAtualizada = Math.floor((ValorApostado3x * 4.20))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo5(num_5,num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
                            
                            
    
                        }

                     }catch {

                            

                     }

                 


                    
                })

                document.querySelector('#campo_11').addEventListener('click', () => {

                    try{
                        if(bomba == 2) {

                            document.querySelector('#campo_11').innerHTML = '💣'
                            document.querySelector('#campo_10').id = 'null'
                            document.querySelector('#campo_12').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {

                            document.querySelector('#campo_10').id = 'null'
                            document.querySelector('#campo_12').id = 'null'
    
                            document.querySelector('#campo_11').innerHTML = '💎'
    
    
                            //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
    
                            
                            let oddAtualizada = Math.floor((ValorApostado3x * 4.20))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo5(num_5,num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                 //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()

                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
    
                        }

                    }

                    catch {

                        
                    }
                    

                    


                })

                document.querySelector('#campo_12').addEventListener('click', () => {

                    try{

                        if(bomba == 3) {

                            document.querySelector('#campo_12').innerHTML = '💣'
                            document.querySelector('#campo_11').id = 'null'
                            document.querySelector('#campo_10').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {
                            document.querySelector('#campo_11').id = 'null'
                            document.querySelector('#campo_10').id = 'null'
    
                            document.querySelector('#campo_12').innerHTML = '💎'
    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
                            

                            let oddAtualizada = Math.floor((ValorApostado3x * 4.20))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo5(num_5,num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()

                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
                        }

                    }
                    catch {

                        


                    }



                    
                })



            }

            logicaJogo5(num_5,num_6,num_7, ValorApostado4x) {

                let bomba = null


                switch(num_5) {


                    case 0:  bomba = 1
                    break
                    case 1:  bomba = 2
                    break
                    case 2:  bomba = 3
                    break

                }
                

                document.querySelector('#campo_13').addEventListener('click', () => {


                     try{   
                        
                        if(bomba == 1) {


                            document.querySelector('#campo_13').innerHTML = '💣'
                            document.querySelector('#campo_14').id = 'null'
                            document.querySelector('#campo_15').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
                            
    
                        } else {

                            document.querySelector('#campo_14').id = 'null'
                            document.querySelector('#campo_15').id = 'null'
    
                            document.querySelector('#campo_13').innerHTML = '💎'

    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()

                            //MULTIPLICACAO ODD

                            let oddAtualizada = Math.floor((ValorApostado4x * 8))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo6(num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
                            
                            
    
                        }

                     }catch {

                            

                     }

                 


                    
                })

                document.querySelector('#campo_14').addEventListener('click', () => {

                    try{
                        if(bomba == 2) {

                            document.querySelector('#campo_14').innerHTML = '💣'
                            document.querySelector('#campo_13').id = 'null'
                            document.querySelector('#campo_15').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {

                            document.querySelector('#campo_13').id = 'null'
                            document.querySelector('#campo_15').id = 'null'
    
                            document.querySelector('#campo_14').innerHTML = '💎'
    
    
                            //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
    
                            
                            let oddAtualizada = Math.floor((ValorApostado4x * 8))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo6(num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()

                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
    
                        }

                    }

                    catch {

                        
                    }
                    

                    


                })

                document.querySelector('#campo_15').addEventListener('click', () => {

                    try{

                        if(bomba == 3) {

                            document.querySelector('#campo_15').innerHTML = '💣'
                            document.querySelector('#campo_14').id = 'null'
                            document.querySelector('#campo_13').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {
                            document.querySelector('#campo_13').id = 'null'
                            document.querySelector('#campo_14').id = 'null'
    
                            document.querySelector('#campo_15').innerHTML = '💎'
    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
                            

                            let oddAtualizada = Math.floor((ValorApostado4x * 8))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo6(num_6,num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()                                
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)
                                
                                this.reiniciarJogoVitoria()

        
        
                            }
    
                        }

                    }
                    catch {

                        


                    }



                    
                })


            }

            logicaJogo6(num_6,num_7, ValorApostado5x) {

                let bomba = null


                switch(num_6) {


                    case 0:  bomba = 1
                    break
                    case 1:  bomba = 2
                    break
                    case 2:  bomba = 3
                    break

                }
                

                document.querySelector('#campo_16').addEventListener('click', () => {


                     try{   
                        
                        if(bomba == 1) {


                            document.querySelector('#campo_16').innerHTML = '💣'
                            document.querySelector('#campo_17').id = 'null'
                            document.querySelector('#campo_18').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
                            
    
                        } else {

                            document.querySelector('#campo_17').id = 'null'
                            document.querySelector('#campo_18').id = 'null'
    
                            document.querySelector('#campo_16').innerHTML = '💎'

    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()

                            //MULTIPLICACAO ODD

                            let oddAtualizada = Math.floor((ValorApostado5x * 12.80))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo7(num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                 //LOGICA AUDIO CASHOUT(VITORIA)
                                 let audio = new Audio()
                                 audio.src = 'audio/audio4.mp3'
                                 audio.play()                               
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                
                                this.reiniciarJogoVitoria()
        
        
                            }
                            
                            
    
                        }

                     }catch {

                            

                     }

                 


                    
                })

                document.querySelector('#campo_17').addEventListener('click', () => {

                    try{
                        if(bomba == 2) {

                            document.querySelector('#campo_17').innerHTML = '💣'
                            document.querySelector('#campo_16').id = 'null'
                            document.querySelector('#campo_18').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {

                            document.querySelector('#campo_16').id = 'null'
                            document.querySelector('#campo_18').id = 'null'
    
                            document.querySelector('#campo_17').innerHTML = '💎'
    
    
                            //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
    
                            
                            let oddAtualizada = Math.floor((ValorApostado5x * 12.80))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo7(num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play() 
                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
    
                        }

                    }

                    catch {

                        
                    }
                    

                    


                })

                document.querySelector('#campo_18').addEventListener('click', () => {

                    try{

                        if(bomba == 3) {

                            document.querySelector('#campo_18').innerHTML = '💣'
                            document.querySelector('#campo_16').id = 'null'
                            document.querySelector('#campo_17').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {
                            document.querySelector('#campo_17').id = 'null'
                            document.querySelector('#campo_16').id = 'null'
    
                            document.querySelector('#campo_18').innerHTML = '💎'
    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
                            

                            let oddAtualizada = Math.floor((ValorApostado5x * 12.80))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            this.logicaJogo7(num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                 //LOGICA AUDIO CASHOUT(VITORIA)
                                 let audio = new Audio()
                                 audio.src = 'audio/audio4.mp3'
                                 audio.play()

                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
                        }

                    }
                    catch {

                        


                    }



                    
                })


            }

            logicaJogo7(num_7, ValorApostado6x) {
                

                let bomba = null


                switch(num_7) {


                    case 0:  bomba = 1
                    break
                    case 1:  bomba = 2
                    break
                    case 2:  bomba = 3
                    break

                }
                

                document.querySelector('#campo_19').addEventListener('click', () => {


                     try{   
                        
                        if(bomba == 1) {


                            document.querySelector('#campo_19').innerHTML = '💣'
                            document.querySelector('#campo_20').id = 'null'
                            document.querySelector('#campo_21').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
                            
    
                        } else {

                            document.querySelector('#campo_20').id = 'null'
                            document.querySelector('#campo_21').id = 'null'
    
                            document.querySelector('#campo_19').innerHTML = '💎'

    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()

                            //MULTIPLICACAO ODD

                            let oddAtualizada = Math.floor((ValorApostado6x * 24.20))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            //this.logicaJogo7(num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').click()
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
                            
                            
    
                        }

                     }catch {

                            

                     }

                 


                    
                })

                document.querySelector('#campo_20').addEventListener('click', () => {

                    try{
                        if(bomba == 2) {

                            document.querySelector('#campo_20').innerHTML = '💣'
                            document.querySelector('#campo_19').id = 'null'
                            document.querySelector('#campo_21').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {

                            document.querySelector('#campo_19').id = 'null'
                            document.querySelector('#campo_21').id = 'null'
    
                            document.querySelector('#campo_20').innerHTML = '💎'
    
    
                            //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
    
                            
                            let oddAtualizada = Math.floor((ValorApostado6x * 24.20))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            //this.logicaJogo7(num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').click()
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)
                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
    
                        }

                    }

                    catch {

                        
                    }
                    

                    


                })

                document.querySelector('#campo_21').addEventListener('click', () => {

                    try{

                        if(bomba == 3) {

                            document.querySelector('#campo_21').innerHTML = '💣'
                            document.querySelector('#campo_20').id = 'null'
                            document.querySelector('#campo_19').id = 'null'

                            let audio = new Audio()
                            audio.src = 'audio/audio3.mp3'
                            audio.play()

                            document.querySelector('#botaoAtualizandoCashout').remove()

                            this.reiniciarJogo()
    
                        } else {
                            document.querySelector('#campo_20').id = 'null'
                            document.querySelector('#campo_19').id = 'null'
    
                            document.querySelector('#campo_21').innerHTML = '💎'
    
                             //LOGICA AUDIO
                            let audio = new Audio()
                            audio.src = 'audio/audio2.mp3'
                            audio.play()
                            

                            let oddAtualizada = Math.floor((ValorApostado6x * 24.20))
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = ''
                            document.querySelector('#botaoAtualizandoCashout').innerHTML = `Seu Cashout e: ${oddAtualizada} Clique Para Parar`
                            //this.logicaJogo7(num_7, oddAtualizada)
                            document.querySelector('#botaoAtualizandoCashout').click()
                            document.querySelector('#botaoAtualizandoCashout').onclick = () => {

                                //LOGICA AUDIO CASHOUT(VITORIA)
                                let audio = new Audio()
                                audio.src = 'audio/audio4.mp3'
                                audio.play()
                                                                
                                //ATUALIZAR SALDO APOS CASHOUT
        
                                let saldoAtualizado = parseFloat(this.dinheiro) + parseFloat(oddAtualizada)
                                this.dinheiro = saldoAtualizado
                                localStorage.setItem('Saldo', saldoAtualizado)
                                document.querySelector('#dinheiro_disponivel').innerHTML = saldoAtualizado
                                document.querySelector('#botaoAtualizandoCashout').remove()
                                //TRABALHAR AQUI PARA REMOVER BOTAO(CASHOUT) E BLOQUEAR SEQUENCIA DE JOGO
                                //-----------------------------------------------------------
                                //console.log(this.dinheiro)

                                this.reiniciarJogoVitoria()
                                

        
        
                            }
    
                        }

                    }
                    catch {

                        


                    }



                    
                })



            }




        }

       


        

        let mines = new Mines()