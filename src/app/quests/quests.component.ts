import { Component, OnInit } from '@angular/core';
import { Quest } from '../Models/quest';
import { QuestService } from '../Services/quest.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.css']
})
export class QuestsComponent implements OnInit {

  quests: Quest[] = [];
  gainedExp: number = 0;
  totalExp: number = 1850;
  greeting: String = '';

  constructor(private questService: QuestService) { }

  ngOnInit(): void {
    this.getQuests();
    this.getGreeting();
  }

  getQuests(): void {
    this.questService.getQuests()
      .subscribe(quest => this.quests = quest);
  }

  updateExp(id: number, exp: number): void
  {
    var experience = exp / this.totalExp * 100;
    this.gainedExp += experience;

    var subQuest;
    this.quests.forEach(quest => {
      if(subQuest = quest.subQuests.find(subQuest => subQuest.id == id)){
        subQuest.completed = true;
        return;
      }
    });
  }

  getGreeting(): void{
    
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      this.greeting = 'Good morning';
    } else if (curHr < 18) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }
  }

  getTotalExp(): void{
    this.quests.forEach(quest => {
      quest.subQuests.forEach(subQuest => {
        this.totalExp += subQuest.experience;
      });
    });
  }
}
