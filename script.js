const estadosCod = {
  DF: 1, GO: 1, MS: 1, MT: 1, TO: 1,
  AC: 2, AM: 2, AP: 2, PA: 2, RO: 2, RR: 2,
  CE: 3, MA: 3, PI: 3,
  AL: 4, PB: 4, PE: 4, RN: 4,
  BA: 5, SE: 5,
  MG: 6,
  ES: 7, RJ: 7,
  SP: 8,
  PR: 9, SC: 9,
  RS: 0
}

/* INPUTS
 * inpVerificarCpf
 * inpCpfAleatorio
 * inpGerarCpf
 */
const formVerificar = document.querySelector('#form-verificar-cpf');
const formCpfAleatorio = document.querySelector('#form-cpf-aleatorio');
const formGerarCpf = document.querySelector('#form-gerar-cpf');

document.addEventListener('DOMContentLoaded', () => {
  inpVerificarCpf.addEventListener('input', () => {
    formatacaoInputCpf(inpVerificarCpf);
  });

  inpGerarCpf.addEventListener('input', () => {
    formatacaoInputCpf(inpGerarCpf);
  });
});

formVerificar.addEventListener('submit', (e) => {
  e.preventDefault();
  verificarCpf(inpVerificarCpf);
});

formCpfAleatorio.addEventListener('submit', (e) => {
  e.preventDefault();
  gerarCpfAleatorio();
});

formGerarCpf.addEventListener('submit', (e) => {
  e.preventDefault();
  gerarCpf();
});

function formatacaoInputCpf(inpCpf) {
  let cpf = inpCpf.value.replace(/\D/g, '');
    cpf = cpf.slice(0,11);

    cpf = cpf.replace(/^(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/, (_match, p1, p2, p3, p4) => {
      let formattedCpf = p1;
      if (p2) formattedCpf += '.' + p2;
      if (p3) formattedCpf += '.' + p3;
      if (p4) formattedCpf += '-' + p4;
      return formattedCpf;
    });

    inpCpf.value = cpf;
}


function randomNum() {
  return parseInt(Math.random() * 10);
}


function verificarCpf(cpf) {
  if (!/^(\d{3}\.){2}\d{3}-\d{2}$/.test(cpf)) {
    return 'CPF Inválido, caracteres incorretos';
  }

  cpfNum = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) {
    return 'CPF deve ter 11 dígitos'
  }
}


function gerarCpfAleatorio() {
  const cpf = [];

  for (let i = 1; i <= 9; i++) {
    cpf.push(randomNum());
  }

  const somaPasso1 = cpf.reduce((sum, num, index) => sum + (num * (10 - index)), 0);
  cpf[9] = (somaPasso1 % 11) >= 2 ? 11 - (somaPasso1 % 11) : 0;

  const somaPasso2 = cpf.slice(1).reduce((sum, num, index) => sum + (num * (10 - index)), 0);
  cpf[10] = (somaPasso2 % 11) >= 2 ? 11 - (somaPasso2 % 11) : 0;

  inpCpfAleatorio.value = cpf.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}


function gerarCpf() {
  console.log('Função não implementada')
}