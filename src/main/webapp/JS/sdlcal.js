/* 2007�`2099�N�Ή� JavaScript�J�����_�[�\�蒠 ver. 1.5
                Copyright (c) Kumiko Maeda 2004 - 2008/09/05 */


monthTable= new Array(31,28,31,30,31,30,31,31,30,31,30,31); //������Ȋ댯
baseDate = new Date();

//�j��������Ƃ��̓t�H�[�}�b�g�͈ȉ��̂悤�Ȋ�����
//case ��-1:
//  Holiday( year, ��, ��, "�j����<br>" );
//  Holiday( year, ��, calDate(year, ��, �T, �j��0(sun)..6(sat)), "�j����<br>" );
//  break;
function setHolliday( year, month, len ){
  var i, tmp;
  
  //�U�֋x���C�����̋x���v�Z�p�̈�m��
  holDate  = new Array(MAXEVENT);
  hi = 0;
  
  for(i=0; i<=len; i++){
    switch( month ){
    case  0:
      Holiday( year, 1, 1, "����<br>" );
      Holiday( year, 1, calDate(year, 1, 2, 1), "���l�̓�<br>" ); //1����2���j��
      break;
    case  1:
      Holiday( year, 2, 11, "�����L�O�̓�<br>" );
      break;
    case  2:
      Holiday( year, 3, vernal(year), "�t���̓�<br>" );
      break;
    case  3:
      Holiday( year, 4, 29, "���a�̓�<br>" );
      break;
    case  4:
      Holiday( year, 5, 3, "���@�L�O��<br>" );
      Holiday( year, 5, 4, "�݂ǂ�̓�<br>" );
      Holiday( year, 5, 5, "���ǂ��̓�<br>" );
      break;
    case  6:
      Holiday( year, 7, calDate(year, 7, 3, 1), "�C�̓�<br>" ); //7����3���j��
      break;
    case  8:
      Holiday( year, 9, calDate(year, 9, 3, 1), "�h�V�̓�<br>" ); //9����3���j��
      Holiday( year, 9, autumn(year), "�H���̓�<br>" );
      break;
    case  9:
      Holiday( year, 10, calDate(year, 10, 2, 1), "�̈�̓�<br>" ); //10����2���j��
      break;
    case 10:
      Holiday( year, 11,  3, "�����̓�<br>" );
      Holiday( year, 11, 23, "�ΘJ���ӂ̓�<br>" );
      break;
    case 11:
      Holiday( year, 12, 23, "�V�c�a����<br>" );
      break;
    }
    year = year + Math.floor((month+1)/12);
    month = (month+1)%12;
  }
  
  for(i=0; i<hi; i++){
    if( holDate[i].getDay() == 0 ){
       tmp = moveDate(holDate[i],1);
       i++;
       while( i<hi && 
              tmp.getDate()  == holDate[i].getDate()  &&
              tmp.getMonth() == holDate[i].getMonth() &&
              tmp.getYear()  == holDate[i].getYear()  ){
         tmp = moveDate(tmp,1);
         i++;
       }
       newEvent( tmp, HOLIDAY, "�U�֋x��<br>" );
       i--;
    }
  }
  
  for(i=1; i<hi; i++){
    tmp = moveDate(holDate[i-1], 2);
    if( tmp.getDate()  == holDate[i].getDate()  &&
        tmp.getMonth() == holDate[i].getMonth() &&
        tmp.getYear()  == holDate[i].getYear()  ){
      tmp = tmp.getDay();
      if( tmp!=1 && tmp!=2 ){
        tmp = moveDate(holDate[i-1], 1);
        newEvent( tmp, HOLIDAY, "�����̋x��<br>" );
      }
    }
  }
}

//year�Nmonth�� ��week day�j���̌v�Z
function calDate( year, month, week, day ){
 var tmp, day1;
 
 tmp = new Date(year, month-1, 1);
 day1 = tmp.getDay();
 tmp = 1 + day - day1 + week*7;
 if( day - day1 >= 0 ) tmp = tmp - 7;
 return tmp;
}

// �t���̓������߂�(2000�`2099) �m���ł���ۏ؂͂Ȃ��Ǝv��
function vernal( year ){
 var tmp = Math.floor( 20.69115 + 0.242194 * (year - 2000)
                       - Math.floor((year - 2000)/4) );
 return tmp;
}

// �H���̓������߂�(2000�`2099) �m���ł���ۏ؂͂Ȃ��Ǝv��
function autumn( year ){
 var tmp = Math.floor( 23.09 + 0.242194 * (year - 2000)
                       - Math.floor((year - 2000)/4) );
 return tmp;
}

function newEvent( date, sel, name ){
  if( si >= MAXEVENT ) return;
  sdlDate[si]  = date;
  sdlSel[si]   = sel;
  sdlName[si]  = name;
  si++;
}

function newSchedule( year, month, date, sel, name ){
  newEvent( new Date( year, month-1, date ), sel, name );
}

function Holiday( year, month, date, name ){
  var i, tmp;
  month--;
  tmp = new Date( year, month, date );
  newEvent( tmp, HOLIDAY, name );
  
  //�U�֋x���A�����̋x���v�Z�p�f�[�^�o�^
  if( hi >= MAXEVENT ) return;
  //�C���T�[�V�����\�[�g
  for( i=hi-1;
       i>=0 && holDate[i].getMonth() == month && holDate[i].getDate() > date;
       i-- ){
    holDate[i+1]  =  holDate[i];
  }
  holDate[i+1]  =  tmp;
  hi++;
}

//date�����dis��������������Ԃ�
function moveDate( date, dis ){
  var d, m, y;
  
  d = date.getDate();
  m = date.getMonth();
  y = date.getFullYear();
  if ( ((y%4)==0 && (y%100)!=0) || (y%400)==0 ) //���邤�̔���(2000�`)
        monthTable[1] = 29;
  else  monthTable[1] = 28;
  
  d = d + dis;
  while( d > monthTable[m]){
    d = d - monthTable[m];
    m++;
    if( m > 11 ){
      m=0;
      y++;
      if ( ((y%4)==0 && (y%100)!=0) || (y%400)==0 ) //���邤�̔���(2000�`)
            monthTable[1] = 29;
      else  monthTable[1] = 28;
    }
  }
  while( d < 0 ){
    m--;
    if( m < 0 ){
      m=11;
      y--;
      if ( ((y%4)==0 && (y%100)!=0) || (y%400)==0 ) //���邤�̔���(2000�`)
            monthTable[1] = 29;
      else  monthTable[1] = 28;
    }
    d = d + monthTable[m];
  }
  return (new Date(y,m,d));
}

//Main�֐�
function showCalendar( argDate ){
  var i, j, k, tmpDate;
  
  tmp = argDate.getMonth() + 1;
  document.formSdlCal.dateInput.value = argDate.getFullYear() + "/" + tmp + "/" + argDate.getDate();
  
  //�X�P�W���[���o�^�p�̈�m��
  sdlDate  = new Array(MAXEVENT);
  sdlSel   = new Array(MAXEVENT);
  sdlName  = new Array(MAXEVENT);
  si = 0;
  
  //�o���Ƃ�
  baseDate = argDate;
  //argDate�̏T�̓��j������\������
  tmpDate = moveDate( argDate, -argDate.getDay() );
  //"����"���L��
  toDate = new Date();
  
  //�\������\���̂��� (SHOWWEEK/4)+2������܂ŏj����o�^
  setHolliday( tmpDate.getFullYear(), tmpDate.getMonth(), Math.floor(SHOWWEEK/4)+2 );
  
  //�X�P�W���[����o�^
  setSchedules();
  
  
  //�`��p�R�[�h�J�n
  docubuf = "<table border='3' cellspacing='0' " + DEFAULT + ">";
  //�j��
  docubuf += "<tr>";
  for(i=0; i<7; i++){
    docubuf += "<td align='center' ";
    if(i==0)      docubuf += SUN + "><strong>" + weekTable[i] + "<\/strong>";
    else if(i==6) docubuf += SAT + "><strong>" + weekTable[i] + "<\/strong>";
    else          docubuf += MON + "><strong>" + weekTable[i] + "<\/strong>";
    docubuf += "<\/td>";
  }
  docubuf += "<\/tr>";
  
  //���t
  for(i=0; i<SHOWWEEK; i++){
    docubuf += "<tr valign='top' height='" + HEIGHT + "'>";
    for(j=0; j<7; j++){
      docubuf += "<td width='" + WIDTH + "' ";
      
      //�Z���F�͍Ō�ɓo�^�����̗D��D
      for(k=si-1; k>=0; k--)
        if( sdlDate[k].getDate()  == tmpDate.getDate()  &&
            sdlDate[k].getMonth() == tmpDate.getMonth() &&
            sdlDate[k].getYear()  == tmpDate.getYear() &&
            sdlSel[k] != ""
          )
          break;
      
      //�Z���F�ݒ�
      if( tmpDate.getDate()  == toDate.getDate()  &&
          tmpDate.getMonth() == toDate.getMonth() )
                        docubuf += TODAY     + ">";
                        //�ʂɂP�N�O�̍����ɐF�t���Ă�������
      else if( k >= 0 ) docubuf += sdlSel[k] + ">";
      else if(j==0)     docubuf += HOLIDAY   + ">";
      else if(j==6)     docubuf += SATURDAY  + ">";
      else              docubuf += USUALDAY  + ">";
      
      //���t�\��
      docubuf += "<strong>";
      //�N���߂͔N����\��
      if( tmpDate.getDate()==1 && tmpDate.getMonth()==0 )
        docubuf += tmpDate.getFullYear() + "/";
      //�ŏ��ƌ����߂͌�����\��
      if( tmpDate.getDate()==1 || (i==0 && j==0) )
        docubuf += tmpDate.getMonth()+1 + "/";
      //���ʂ͓������\��
      docubuf += tmpDate.getDate() + "<\/strong><br>";
      
      //�X�P�W���[�����ߍ��݁D������������S���D�o�^���D
      for(k=0; k<si; k++)
        if( sdlDate[k].getDate()  == tmpDate.getDate()
            && sdlDate[k].getMonth() == tmpDate.getMonth()
            && sdlDate[k].getYear()  == tmpDate.getYear()
          )
          docubuf += sdlName[k];
      
      //����i�߂�
      tmpDate = moveDate( tmpDate, 1 );
      
      docubuf += "<\/td>";
    }
    docubuf += "<\/tr>";
  }
  docubuf += "<\/table>";
  
  divSdlCal.innerHTML = docubuf;

}
