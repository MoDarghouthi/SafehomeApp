import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Storage } from '@ionic/storage';
import { EmergencyService } from './emergency.service';


@Injectable()
export class MotionService {

  alert:Boolean=false;

  constructor(private emergencyService: EmergencyService,private deviceMotion: DeviceMotion, private storage: Storage) { }

  getMotion(){
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration) => {
      this.storage.get("motion").then(motion=>{
        if(((Number(motion.x)-acceleration.x)>=3)||((Number(motion.y)-acceleration.y)>=3)||((Number(motion.z)-acceleration.z)>=3)&& !this.alert){
          this.alert=true;
          this.storage.get("access_token").then(token=>{
            this.storage.get("User").then(user=>{
              this.emergencyService.updateEmergency({"status":"ALERTS"},user.email,token).subscribe();
            });
          });
        }
        else{
          this.storage.set("motion",{"x":acceleration.x,"y":acceleration.y,"z":acceleration.z});
        }
      });
    });
    return subscription;
  }
}
